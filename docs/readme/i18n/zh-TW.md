<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>為你打造的 AI 智慧代理辦公應用程式。</strong></p>

<p align="center">
  <a href="../../../LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-2456FF" alt="License: Apache-2.0"></a>
  <a href="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml"><img src="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI on main"></a>
  <a href="https://github.com/dodamworks/onyouoffice/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/onyouoffice?style=flat&amp;label=GitHub%20stars&amp;color=2456FF" alt="GitHub stars"></a>
</p>

開啟文件，說明想修改的內容，然後在同一個視窗繼續工作。Onyou Office 將文件編輯器與 AI 代理整合於桌面應用程式。可用 AI 起草、修改，也能自行編輯。應用程式免費且開源，AI 連線為選用。

<details>
<summary>選擇語言 · 21種語言</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · **繁體中文** <!-- lang-switcher -->

</details>

## 在同一處處理文件

- 建立和編輯文件、試算表、簡報及 Hangul（HWP/HWPX）。也支援 PDF、Markdown、HTML、心智圖與 EPUB。編輯及轉換能力依格式而異。
- 在 AI 助理中要求修改文件，在知識庫中針對選定文件提問，並用專案整理指示、記憶、檔案與對話。
- 支援 21 種介面語言、淺色與深色主題及 AI 聊天字級調整。Onyou Office 改善首次使用、首頁、AI 面板、專案與知識庫，並採用獨立品牌及安裝和資料路徑。

## 開始使用

目前是須從原始碼建置的開發版本，尚無官方安裝程式或更新來源。已有 Windows、macOS 與 Linux 建置設定，驗證後的發布平台將另行公告。需要 Node.js 24、npm、Rust（cargo）及平台原生建置工具。

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

從首頁開啟檔案或新增文件。使用 AI 時，在**設定 → AI**中選擇連線，再於文件的 AI 助理輸入請求。

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## AI、費用與資料

不需 AI 帳戶即可編輯文件。AI 訂閱、API 費用與限額依供應商條款。實作包含 Codex、Claude、ChatGPT 直接登入、OpenRouter、Gemini、API 金鑰及本機 AI 連線，各有不同要求與可用性。使用 AI 會將相關文件內容、附件和對話傳送至選定供應商。開發版和安裝版使用不同的應用程式資料目錄。

[Privacy](../../../PRIVACY.md)

已透過官方 Codex 程式驗證知識庫提問與後續對話。ChatGPT 直接登入仍有供應商授權錯誤。不保證所有格式的顯示完全一致或與其他辦公軟體完全相容。

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## 協助與貢獻

歡迎回報問題、提出建議、貢獻翻譯和程式碼。請使用合成範例，不要公開個人文件、金鑰或帳戶資訊。其他問題請聯絡 **support@onyouoffice.com**。

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## 授權與來源

Onyou Office 是 IeumOffice 的獨立分支，IeumOffice 以 GenOffice 為基礎。文件引擎及許多編輯功能來自這些專案、rhwp 與開源貢獻者。我們保留原始歷史及作者，不宣稱自行開發所有功能。專案原始碼採 Apache-2.0，第三方元件保留各自條款，商標權另行規範。不主張與上游專案或 AI、檔案格式供應商有合作或背書關係。

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
