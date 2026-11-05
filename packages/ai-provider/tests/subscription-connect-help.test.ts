// Modified by Onyou Office on 2026-10-31 for the independent Onyou Office local development build.
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { subscriptionConnectHelpUrl } from '../src/connect-help'

const distribution = vi.hoisted(() => ({ website: 'https://example.test' }))
vi.mock('@genoffice/i18n', () => ({
  get PRODUCT_WEBSITE() {
    return distribution.website
  },
}))
beforeEach(() => {
  distribution.website = 'https://example.test'
})

describe('subscriptionConnectHelpUrl', () => {
  it('does not invent a website when unconfigured', () => {
    distribution.website = ''
    expect(subscriptionConnectHelpUrl('codex')).toBe('')
  })

  it('opens the section of each path the connect guide offers', () => {
    expect(subscriptionConnectHelpUrl('claude-code')).toBe('https://example.test/connect#claude')
    expect(subscriptionConnectHelpUrl('codex')).toBe('https://example.test/connect#codex')
    expect(subscriptionConnectHelpUrl('free')).toBe('https://example.test/connect#free')
  })

  it('opens the top of the page for anything else a renderer sends', () => {
    for (const path of [null, undefined, '', 'toString', '#evil', 'https://example.com', 42]) {
      expect(subscriptionConnectHelpUrl(path)).toBe('https://example.test/connect')
    }
  })
})
