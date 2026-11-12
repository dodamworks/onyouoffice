<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>Vaše kancelář s AI agenty.</strong></p>

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
  <img src="https://img.shields.io/badge/UI-21%20languages-555" alt="21 interface languages">
</p>

Otevřete dokument, popište požadované změny a pokračujte ve stejném okně. Onyou Office propojuje editory dokumentů a AI agenty na počítači. S AI můžete tvořit návrhy a úpravy nebo pracovat sami. Aplikace je zdarma a open source; AI je volitelná.

<details>
<summary>Vyberte jazyk · 21 jazyků</summary>

[English](../../../README.md) · [العربية](ar.md) · **Čeština** · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## Dokumenty na jednom místě

- Upravujte diagramy draw.io a místně importujte soubory Visio (.vsdx) jako nové diagramy.
- Vytvářejte a upravujte dokumenty, tabulky, prezentace a soubory Hangul (HWP/HWPX). Podporovány jsou také PDF, Markdown, HTML, myšlenkové mapy a EPUB. Možnosti úprav a převodů závisejí na formátu.
- Požádejte AI asistenta o úpravy, ptejte se na vybrané dokumenty v Knowledge Vault a uchovávejte pokyny, paměť, soubory a rozhovory v projektech.
- 21 jazyků rozhraní, světlé i tmavé motivy a nastavitelná velikost textu AI chatu. Onyou Office upravuje úvod, domovskou obrazovku, AI panely, projekty a Knowledge Vault a používá vlastní značku a instalační i datové cesty.

## Začínáme

Instalační soubory najdeš v [Releases](https://github.com/dodamworks/onyouoffice/releases/latest): Windows x64, macOS (Apple Silicon a Intel, beta) a Linux x64 (beta). Aktualizace jsou zatím ruční. Pro sestavení ze zdrojů potřebuješ Node.js 24, npm, Rust (`cargo`) a nativní nástroje pro svůj systém.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

Na domovské obrazovce otevřete nebo vytvořte dokument. Pro AI zvolte připojení v **Nastavení → AI** a napište požadavek do asistenta dokumentu.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## AI, náklady a data

Úpravy nevyžadují AI účet. Předplatné, API poplatky a limity určuje poskytovatel. Codex, Claude, přímé přihlášení ChatGPT, OpenRouter, Gemini, API klíče a místní AI mají různé požadavky a dostupnost. Relevantní obsah dokumentů, přílohy a rozhovory se odesílají zvolenému poskytovateli. Vývojové a nainstalované verze mají oddělené datové složky.

[Privacy](../../../PRIVACY.md)

Otázky a navazující rozhovory v Knowledge Vault byly ověřeny pomocí oficiálního programu Codex. Přímé přihlášení ChatGPT má známou chybu souhlasu poskytovatele. Nezaručujeme shodné vykreslení ani úplnou kompatibilitu s jinými aplikacemi.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## Pomoc a příspěvky

Vítáme hlášení chyb, návrhy, překlady i kód. Používejte umělé příklady bez osobních dokumentů, klíčů a údajů účtu. Další dotazy: **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## Licence a původ

Onyou Office je nezávislý fork IeumOffice, který vychází z GenOffice. Dokumentové enginy a mnoho funkcí pochází z těchto projektů, rhwp a od jejich přispěvatelů. Zachováváme údaje o původu a autorech a nepřivlastňujeme si všechny převzaté funkce. Zdrojový kód je pod Apache-2.0; komponenty třetích stran zachovávají vlastní podmínky. Ochranné známky jsou samostatné. Netvrdíme, že nás původní projekty či poskytovatelé podporují nebo že jsme s nimi propojeni.

[IeumOffice](https://github.com/pblsketch/ieumoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
