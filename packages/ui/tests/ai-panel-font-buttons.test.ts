/** @vitest-environment jsdom */
import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { beforeEach, afterEach, expect, it, vi } from 'vitest'
import { LANGS } from '@genoffice/i18n'
import { AiPanelFontSizeButtons } from '../src/AiPanelFontSizeButtons'
import { AI_PANEL_FONT_LABELS } from '../src/strings-ai-panel-font'
import { DEFAULT_AI_PANEL_PREFS, type AiPanelPrefs } from '../src/ai-panel-prefs'
import { applyAiPanelPrefs } from '../src/ai-panel-prefs-store'

let host: HTMLDivElement
let root: ReturnType<typeof createRoot>
beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  applyAiPanelPrefs({})
  host = document.createElement('div')
  document.body.append(host)
  root = createRoot(host)
})
afterEach(() => {
  act(() => root.unmount())
  host.remove()
  applyAiPanelPrefs({})
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})
const buttons = () => Array.from(host.querySelectorAll<HTMLButtonElement>('button'))

it('persists two-pixel steps through the existing preference and updates other mounted controls', async () => {
  let stored = DEFAULT_AI_PANEL_PREFS
  const save = vi.fn(async (patch: Partial<AiPanelPrefs>) => (stored = { ...stored, ...patch }))
  act(() =>
    root.render(
      createElement(
        'div',
        {},
        createElement(AiPanelFontSizeButtons, { lang: 'ko', onChange: save }),
        createElement(AiPanelFontSizeButtons, { lang: 'en', onChange: save }),
      ),
    ),
  )
  await act(async () => buttons()[1].click())
  expect(save).toHaveBeenLastCalledWith({ fontSize: 'custom', customFontSize: 16 })
  expect(
    Array.from(host.querySelectorAll('[data-font-size]')).map((el) =>
      el.getAttribute('data-font-size'),
    ),
  ).toEqual(['16', '16'])
  await act(async () => buttons()[2].click())
  expect(save).toHaveBeenLastCalledWith({ fontSize: 'custom', customFontSize: 14 })
  expect(stored.side).toBe('left')
  expect(document.documentElement.style.getPropertyValue('--ai-font-zoom')).toBe('1')
})

it('starts from preset sizes and follows preference updates from Settings', async () => {
  const save = vi.fn(async (patch: Partial<AiPanelPrefs>) => ({
    ...DEFAULT_AI_PANEL_PREFS,
    ...patch,
  }))
  applyAiPanelPrefs({ fontSize: 'large' })
  act(() => root.render(createElement(AiPanelFontSizeButtons, { lang: 'en', onChange: save })))
  await act(async () => buttons()[1].click())
  expect(save).toHaveBeenLastCalledWith({ fontSize: 'custom', customFontSize: 18 })
  act(() => applyAiPanelPrefs({ fontSize: 'custom', customFontSize: 24 }))
  expect(host.querySelector('[data-font-size]')?.getAttribute('data-font-size')).toBe('24')
})

it('clamps both limits and disables the unavailable direction', async () => {
  const save = vi.fn(async (patch: Partial<AiPanelPrefs>) => ({
    ...DEFAULT_AI_PANEL_PREFS,
    ...patch,
  }))
  applyAiPanelPrefs({ fontSize: 'custom', customFontSize: 31 })
  act(() => root.render(createElement(AiPanelFontSizeButtons, { lang: 'en', onChange: save })))
  await act(async () => buttons()[1].click())
  expect(save).toHaveBeenLastCalledWith({ fontSize: 'custom', customFontSize: 32 })
  expect(buttons()[1].disabled).toBe(true)
  act(() => applyAiPanelPrefs({ fontSize: 'custom', customFontSize: 11 }))
  await act(async () => buttons()[0].click())
  expect(save).toHaveBeenLastCalledWith({ fontSize: 'custom', customFontSize: 10 })
  expect(buttons()[0].disabled).toBe(true)
})

it('keeps the current size after a failed save and prevents duplicate pending requests', async () => {
  let reject!: (error: Error) => void
  const save = vi.fn(
    () =>
      new Promise<AiPanelPrefs>((_resolve, no) => {
        reject = no
      }),
  )
  vi.spyOn(console, 'error').mockImplementation(() => {})
  act(() => root.render(createElement(AiPanelFontSizeButtons, { lang: 'en', onChange: save })))
  act(() => {
    buttons()[1].click()
    buttons()[1].click()
  })
  expect(save).toHaveBeenCalledOnce()
  expect(buttons().every((b) => b.disabled)).toBe(true)
  await act(async () => reject(new Error('disk full')))
  expect(host.querySelector('[data-font-size]')?.getAttribute('data-font-size')).toBe('14')
  expect(buttons().every((b) => !b.disabled)).toBe(true)
})

it('names the group and both controls in all UI languages', () => {
  expect(Object.keys(AI_PANEL_FONT_LABELS).sort()).toEqual([...LANGS].sort())
  for (const lang of LANGS) {
    expect(Object.values(AI_PANEL_FONT_LABELS[lang]).every((s) => s.trim())).toBe(true)
  }
})
