<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>あなたのための、AI エージェントと使うオフィス。</strong></p>

<p align="center">
  <a href="https://onyouoffice.com/">onyouoffice.com</a>
</p>

<p align="center">
  <a href="../../../LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-2456FF" alt="License: Apache-2.0"></a>
  <a href="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml"><img src="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI on main"></a>
  <a href="https://github.com/dodamworks/onyouoffice/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/onyouoffice?style=flat&amp;label=GitHub%20stars&amp;color=2456FF" alt="GitHub stars"></a>
  <a href="https://github.com/dodamworks/onyouoffice/releases/latest"><img src="https://img.shields.io/github/v/release/dodamworks/onyouoffice?label=release&amp;color=2456FF" alt="Latest release"></a>
  <a href="https://github.com/dodamworks/onyouoffice/releases"><img src="https://img.shields.io/github/downloads/dodamworks/onyouoffice/total?label=downloads&amp;color=2456FF" alt="Total downloads"></a>
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-555" alt="Platforms: Windows, macOS, Linux">
  <img src="https://img.shields.io/badge/UI-22%20languages-555" alt="22 interface languages">
</p>

文書を開き、変更したい内容を伝えて、そのまま同じウィンドウで作業を続けられます。Onyou Office は文書エディターと AI エージェントをひとつにしたデスクトップアプリです。AI で下書きや修正を行うことも、自分で編集することもできます。無料のオープンソースで、AI 接続は任意です。

<details>
<summary>言語を選択 · 21言語</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · **日本語** · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## 文書作業をひとつの場所で

- draw.ioの図を編集し、Visio（.vsdx）ファイルを新しい図としてこのPC内で取り込めます。
- 文書、表計算、プレゼンテーション、Hangul（HWP/HWPX）を作成・編集できます。PDF、Markdown、HTML、マインドマップ、EPUB も扱えます。編集・変換の範囲は形式によって異なります。
- AI アシスタントに文書の変更を依頼し、ナレッジボールトで選んだ文書について質問できます。プロジェクトには指示、メモリー、ファイル、会話をまとめられます。
- 22 言語の UI、ライト・ダークテーマ、AI チャットの文字サイズ調整に対応。Onyou Office は初回案内、ホーム、AI パネル、プロジェクト、ナレッジボールトを整理し、ブランドとインストール・データのパスを分離しています。

## はじめに

[Releases](https://github.com/dodamworks/onyouoffice/releases/latest) からインストーラーをダウンロードできます。Windows x64、macOS（Apple Silicon・Intel、ベータ）、Linux x64（ベータ）に対応します。現在の更新方法は手動です。ソースからのビルドには Node.js 24、npm、Rust（`cargo`）、各 OS のネイティブビルドツールが必要です。

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

ホームでファイルを開くか、文書を新規作成してください。AI を使うには、**設定 → AI** で接続を選び、文書の AI アシスタントに依頼を入力します。

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## AI・費用・データ

AI アカウントなしでも文書を編集できます。AI の契約、API 料金、利用上限は各提供元の条件に従います。Codex、Claude、ChatGPT への直接ログイン、OpenRouter、Gemini、API キー、ローカル AI の接続経路があり、要件や利用可否は異なります。AI を使うと関連する文書内容、添付、会話が選んだ提供元へ送信されます。開発版とインストール版は別のアプリデータフォルダーを使います。

[Privacy](../../../PRIVACY.md)

公式 Codex プログラム経由でナレッジボールトの質問と継続会話を確認済みです。ChatGPT への直接ログインには提供元の同意処理エラーが残っています。すべての形式で同じ表示や完全な互換性を保証するものではありません。

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## サポートと貢献

不具合報告、改善提案、翻訳、コードの貢献を歓迎します。合成した例を使い、個人文書、キー、アカウント情報は公開しないでください。その他のお問い合わせ：**support@onyouoffice.com**。

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## ライセンスと出典

Onyou Office は IeumOffice の独立したフォークで、その基盤は GenOffice です。文書エンジンや多くの編集機能は、これらのプロジェクト、rhwp、オープンソース貢献者によるものです。出典と著作者の表示を保ち、すべてを独自開発したとは主張しません。ソースは Apache-2.0、第三者の構成要素は個別の条件に従います。商標権は別です。上流プロジェクトや AI・ファイル形式提供元との提携・後援は主張しません。

[IeumOffice](https://github.com/pblsketch/ieumoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
