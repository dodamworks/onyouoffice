/**
 * @vitest-environment jsdom
 */
import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { HomeApi } from '../src/shared/home-api'
import { LocaleProvider } from '../src/renderer/src/locale'
import { SettingsModal } from '../src/renderer/src/SettingsModal'

const actEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
actEnvironment.IS_REACT_ACT_ENVIRONMENT = true

let host: HTMLDivElement
let root: Root

beforeEach(() => {
  host = document.createElement('div')
  document.body.append(host)
  root = createRoot(host)
})

afterEach(() => {
  act(() => root.unmount())
  host.remove()
})

async function click(button: HTMLButtonElement): Promise<void> {
  await act(async () => {
    button.click()
    await Promise.resolve()
  })
}

describe('Settings AutoSave default', () => {
  it('reads the shell default and persists a flip', async () => {
    const persist = vi.fn<(on: boolean) => Promise<void>>().mockResolvedValue(undefined)
    window.aiOffice = {
      getTheme: async () => 'system',
      getDefaultSaveDir: async () => '',
      getAutoSaveDefault: async () => ({ on: true, updatedAt: 1 }),
      setAutoSaveDefault: persist,
      getUpdateChannel: async () => 'stable',
      getAppVersion: async () => '1.0.0',
    } as unknown as HomeApi

    await act(async () => {
      root.render(
        createElement(
          LocaleProvider,
          { initial: 'en' },
          createElement(SettingsModal, {
            onClose: vi.fn(),
          }),
        ),
      )
      await Promise.resolve()
    })

    const general = Array.from(host.querySelectorAll<HTMLButtonElement>('.set-nav-item')).find(
      (button) => button.textContent?.includes('General'),
    )
    await click(general!)

    const toggle = host.querySelector<HTMLButtonElement>(
      '.set-switch[aria-label="Auto-save all documents"]',
    )
    expect(toggle?.getAttribute('aria-checked')).toBe('true')

    await click(toggle!)
    expect(persist).toHaveBeenLastCalledWith(false)
    expect(toggle?.getAttribute('aria-checked')).toBe('false')
  })
})

describe('Settings nickname', () => {
  it('loads, changes and clears the greeting name independently of document author', async () => {
    const save = vi.fn(async (value: string) => value)
    const author = vi.fn()
    window.aiOffice = {
      getTheme: async () => 'system',
      getDefaultSaveDir: async () => '',
      getNickname: async () => 'Sam',
      setNickname: save,
      getAuthorName: async () => ({ value: 'Document Author', source: 'custom' }),
      setAuthorName: author,
      getAutoSaveDefault: async () => ({ on: false, updatedAt: 0 }),
      getUpdateChannel: async () => 'stable',
      getAppVersion: async () => '1.0.0',
    } as unknown as HomeApi
    await act(async () => {
      root.render(
        createElement(
          LocaleProvider,
          { initial: 'en' },
          createElement(SettingsModal, { onClose: vi.fn() }),
        ),
      )
    })
    await click(
      Array.from(host.querySelectorAll<HTMLButtonElement>('.set-nav-item')).find((el) =>
        el.textContent?.includes('General'),
      )!,
    )
    const input = host.querySelector<HTMLInputElement>('#set-nickname')!
    expect(input.value).toBe('Sam')
    const edit = async (value: string) => {
      await act(async () => {
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(
          input,
          value,
        )
        input.dispatchEvent(new Event('input', { bubbles: true }))
      })
      await act(async () => input.dispatchEvent(new FocusEvent('focusout', { bubbles: true })))
    }
    await edit('  Mina  ')
    expect(save).toHaveBeenLastCalledWith('Mina')
    expect(input.value).toBe('Mina')
    await edit('')
    expect(save).toHaveBeenLastCalledWith('')
    expect(input.value).toBe('')
    expect(author).not.toHaveBeenCalled()
    expect(host.querySelector<HTMLInputElement>('#set-author-name')!.value).toBe('Document Author')
  })
})

it('updates the open General font setting after a change from an editor', async () => {
  let changed!: (value: import('@genoffice/ui').AiPanelPrefs) => void
  window.aiOffice = {
    getTheme: async () => 'system',
    getDefaultSaveDir: async () => '',
    getAutoSaveDefault: async () => ({ on: false, updatedAt: 0 }),
    getUpdateChannel: async () => 'stable',
    getAppVersion: async () => '1.0.0',
    onAiPanelPrefsChanged: (handler: typeof changed) => {
      changed = handler
      return () => {}
    },
  } as unknown as HomeApi
  await act(async () =>
    root.render(
      createElement(
        LocaleProvider,
        { initial: 'en' },
        createElement(SettingsModal, { onClose: vi.fn() }),
      ),
    ),
  )
  await click(
    Array.from(host.querySelectorAll<HTMLButtonElement>('.set-nav-item')).find((el) =>
      el.textContent?.includes('General'),
    )!,
  )
  await act(async () =>
    changed({
      side: 'left',
      fontSize: 'custom',
      customFontSize: 20,
      spellcheck: true,
      openInNewDocs: true,
      showAiSidebar: true,
    }),
  )
  expect(host.querySelector<HTMLInputElement>('.set-num-input')?.value).toBe('20')
})
