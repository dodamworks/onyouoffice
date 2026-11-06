// Modified by Onyou Office: a denied skill file must never be read before the boundary check.
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, expect, it, vi } from 'vitest'
import { buildAgentSkillBundle } from '../src/agent-session/skills'
import { listSkillFolderFiles, MAX_USER_SKILL_BYTES } from '../src/user-skills'

vi.mock('node:fs/promises', async (original) => {
  const actual = await original<typeof import('node:fs/promises')>()
  return { ...actual, readFile: vi.fn(actual.readFile) }
})
vi.mock('../src/user-skills', async (original) => {
  const actual = await original<typeof import('../src/user-skills')>()
  return { ...actual, listSkillFolderFiles: vi.fn(actual.listSkillFolderFiles) }
})

const roots: string[] = []
function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'onyou-skill-boundary-'))
  roots.push(root)
  const dir = join(root, 'sample')
  mkdirSync(dir)
  const metadata = join(dir, 'SKILL.md')
  writeFileSync(
    metadata,
    '---\nname: sample\ndescription: synthetic fixture\n---\nUnchecked text.\n',
  )
  return {
    root,
    dir,
    metadata,
    input: {
      id: 'app:sample',
      source: 'app' as const,
      name: 'sample',
      title: 'Sample',
      description: 'Synthetic fixture',
      dir,
      invoke: 'auto' as const,
    },
  }
}
afterEach(() => {
  vi.clearAllMocks()
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true })
})

it('does not read metadata omitted by the checked file walk, including an outward link', async () => {
  const f = fixture()
  // The real file walker omits outward links; test that its consumer honors that result.
  vi.mocked(listSkillFolderFiles).mockResolvedValueOnce({ files: [], bytes: 0, tooLarge: false })
  const result = await buildAgentSkillBundle([f.input], join(f.root, 'bundle'))
  expect(result.skills).toEqual([])
  expect(vi.mocked(readFile).mock.calls.some(([path]) => path === f.metadata)).toBe(false)
})

it('rejects an over-limit folder before reading metadata contents', async () => {
  const f = fixture()
  vi.mocked(listSkillFolderFiles).mockResolvedValueOnce({
    files: [],
    bytes: MAX_USER_SKILL_BYTES + 1,
    tooLarge: true,
  })
  const result = await buildAgentSkillBundle([f.input], join(f.root, 'bundle'))
  expect(result.skipped[0]?.reason).toBe('too-large')
  expect(vi.mocked(readFile).mock.calls.some(([path]) => path === f.metadata)).toBe(false)
})

it('reads the canonical file supplied by the walk instead of reopening an unchecked name', async () => {
  const f = fixture()
  const canonical = join(f.dir, 'resolved.md')
  const text = '---\nname: sample\ndescription: synthetic fixture\n---\nChecked canonical text.\n'
  writeFileSync(canonical, text)
  vi.mocked(listSkillFolderFiles).mockResolvedValueOnce({
    files: [{ rel: 'SKILL.md', path: canonical, size: Buffer.byteLength(text) }],
    bytes: Buffer.byteLength(text),
    tooLarge: false,
  })
  const result = await buildAgentSkillBundle([f.input], join(f.root, 'bundle'))
  expect(result.skills).toHaveLength(1)
  expect(readFileSync(result.skills[0]!.skillMd, 'utf8')).toContain('Checked canonical text.')
  expect(vi.mocked(readFile).mock.calls.some(([path]) => path === canonical)).toBe(true)
  expect(vi.mocked(readFile).mock.calls.some(([path]) => path === f.metadata)).toBe(false)
})
