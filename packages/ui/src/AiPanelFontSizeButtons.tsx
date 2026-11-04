import React, { useRef, useState } from 'react'
import type { Lang } from '@genoffice/i18n'
import {
  AI_CUSTOM_FONT_MAX_PX,
  AI_CUSTOM_FONT_MIN_PX,
  aiPanelFontPx,
  type AiPanelPrefs,
} from './ai-panel-prefs'
import { applyAiPanelPrefs, useAiPanelPrefs } from './ai-panel-prefs-store'
import { AI_PANEL_FONT_LABELS } from './strings-ai-panel-font'
import './ai-panel-font.css'

export function AiPanelFontSizeButtons({
  lang,
  onChange,
}: {
  lang: Lang
  onChange: (patch: Pick<AiPanelPrefs, 'fontSize' | 'customFontSize'>) => Promise<AiPanelPrefs>
}) {
  const prefs = useAiPanelPrefs()
  const size = aiPanelFontPx(prefs)
  const labels = AI_PANEL_FONT_LABELS[lang]
  const [pending, setPending] = useState(false)
  const saving = useRef(false)
  const change = async (delta: number) => {
    if (saving.current) return
    const next = Math.max(AI_CUSTOM_FONT_MIN_PX, Math.min(AI_CUSTOM_FONT_MAX_PX, size + delta))
    if (next === size) return
    saving.current = true
    setPending(true)
    try {
      applyAiPanelPrefs(await onChange({ fontSize: 'custom', customFontSize: next }))
    } catch (error) {
      console.error('[ai-panel] Failed to save text size:', error)
    } finally {
      saving.current = false
      setPending(false)
    }
  }
  return (
    <span
      className="ai-panel-font-controls"
      role="group"
      aria-label={`${labels.size} (${size}px)`}
      data-font-size={size}
    >
      <button
        type="button"
        className="ai-header-btn ai-panel-font-button"
        aria-label={labels.smaller}
        data-tip={labels.smaller}
        disabled={pending || size <= AI_CUSTOM_FONT_MIN_PX}
        onClick={() => void change(-2)}
      >
        A−
      </button>
      <button
        type="button"
        className="ai-header-btn ai-panel-font-button"
        aria-label={labels.larger}
        data-tip={labels.larger}
        disabled={pending || size >= AI_CUSTOM_FONT_MAX_PX}
        onClick={() => void change(2)}
      >
        A+
      </button>
    </span>
  )
}
