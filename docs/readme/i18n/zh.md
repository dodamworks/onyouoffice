<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>为你打造的 AI 智能体办公应用。</strong></p>

<p align="center">
  <a href="../../../LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-2456FF" alt="License: Apache-2.0"></a>
  <a href="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml"><img src="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI on main"></a>
  <a href="https://github.com/dodamworks/onyouoffice/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/onyouoffice?style=flat&amp;label=GitHub%20stars&amp;color=2456FF" alt="GitHub stars"></a>
</p>

打开文档，说出想要修改的内容，然后在同一个窗口继续工作。Onyou Office 将文档编辑器与 AI 智能体整合到桌面应用中。用 AI 起草和修改，也可以自行编辑。应用免费且开源，AI 连接可选。

<details>
<summary>选择语言 · 21种语言</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · **简体中文** · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## 一处完成文档工作

- 编辑 draw.io 图表，并在本机将 Visio（.vsdx）文件导入为新图表。
- 创建和编辑文档、电子表格、演示文稿及 Hangul（HWP/HWPX）。也支持 PDF、Markdown、HTML、思维导图和 EPUB。编辑及转换能力因格式而异。
- 在 AI 助手中请求修改文档，在知识仓库中针对所选文档提问，并通过项目整理指令、记忆、文件和对话。
- 支持 21 种界面语言、浅色和深色主题，以及 AI 聊天字号调整。Onyou Office 改进了首次使用、主页、AI 面板、项目与知识仓库，并采用独立品牌及安装和数据路径。

## 开始使用

从 [Releases](https://github.com/dodamworks/onyouoffice/releases/latest) 下载安装包：Windows x64、macOS（Apple Silicon 与 Intel，测试版）、Linux x64（测试版）。目前需手动更新。从源码构建需要 Node.js 24、npm、Rust（`cargo`）及各平台的原生构建工具。

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

从主页打开文件或新建文档。使用 AI 时，在**设置 → AI**中选择连接，然后在文档的 AI 助手中输入请求。

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## AI、费用与数据

无需 AI 账户即可编辑文档。AI 订阅、API 费用和限额遵循提供商条款。实现包含 Codex、Claude、ChatGPT 直接登录、OpenRouter、Gemini、API 密钥和本地 AI 连接，要求及可用性各不相同。使用 AI 时，相关文档内容、附件和对话会发送给所选提供商。开发版和安装版使用独立的应用数据目录。

[Privacy](../../../PRIVACY.md)

已通过官方 Codex 程序验证知识仓库提问及后续对话。ChatGPT 直接登录仍有提供商授权错误。不保证所有格式的渲染完全一致或与其他办公应用完全兼容。

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## 帮助与贡献

欢迎报告问题、提出建议、贡献翻译及代码。请使用合成示例，不要公开个人文档、密钥或账户信息。其他问题请联系 **support@onyouoffice.com**。

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## 许可证与来源

Onyou Office 是 IeumOffice 的独立分支，IeumOffice 基于 GenOffice。文档引擎及大量编辑功能来自这些项目、rhwp 和开源贡献者。我们保留原始出处与作者署名，不声称独立开发了所有功能。项目源码采用 Apache-2.0，第三方组件保留各自条款，商标权另行规定。不主张与上游项目或 AI、文件格式提供商有合作或背书关系。

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
