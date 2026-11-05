<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>Jouw kantoor met AI-agenten.</strong></p>

<p align="center">
  <a href="../../../LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-2456FF" alt="License: Apache-2.0"></a>
  <a href="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml"><img src="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI on main"></a>
  <a href="https://github.com/dodamworks/onyouoffice/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/onyouoffice?style=flat&amp;label=GitHub%20stars&amp;color=2456FF" alt="GitHub stars"></a>
</p>

Open een document, beschrijf wat je wilt veranderen en werk verder in hetzelfde venster. Onyou Office brengt documenteditors en AI-agenten samen op je desktop. Maak concepten en revisies met AI of bewerk zelf. De app is gratis en open source; AI is optioneel.

<details>
<summary>Kies je taal · 21 talen</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · **Nederlands** · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## Eén plek voor je documenten

- Bewerk draw.io-diagrammen en importeer Visio-bestanden (.vsdx) lokaal als nieuwe diagrammen.
- Maak en bewerk documenten, spreadsheets, presentaties en Hangul-bestanden (HWP/HWPX). Ook PDF, Markdown, HTML, mindmaps en EPUB worden ondersteund. Bewerkings- en conversiemogelijkheden verschillen per formaat.
- Vraag de AI-assistent om wijzigingen, stel in Knowledge Vault vragen over gekozen documenten en verzamel instructies, geheugen, bestanden en gesprekken in projecten.
- 21 interfacetalen, lichte en donkere thema’s en instelbare AI-chattekst. Onyou Office vernieuwt de introductie, startpagina, AI-panelen, projecten en Knowledge Vault, met eigen branding en installatie- en datapaden.

## Aan de slag

Deze ontwikkelversie bouw je vanuit de broncode. Officiële installatiepakketten en een updatefeed zijn nog niet beschikbaar. Er zijn buildconfiguraties voor Windows, macOS en Linux; geverifieerde doelen worden apart aangekondigd. Je hebt Node.js 24, npm, Rust (cargo) en de native buildtools van je platform nodig.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

Open of maak een document op de startpagina. Kies voor AI een verbinding onder **Instellingen → AI** en voer een verzoek in bij de AI-assistent van het document.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## AI, kosten en gegevens

Bewerken vereist geen AI-account. Abonnementen, API-kosten en limieten volgen de voorwaarden van de aanbieder. Codex, Claude, directe ChatGPT-login, OpenRouter, Gemini, API-sleutels en lokale AI verschillen in vereisten en beschikbaarheid. Relevante documentinhoud, bijlagen en gesprekken gaan naar de gekozen aanbieder. Ontwikkelversies en geïnstalleerde versies gebruiken aparte datamappen.

[Privacy](../../../PRIVACY.md)

Vragen en vervolggesprekken in Knowledge Vault zijn getest met het officiële Codex-programma. Directe ChatGPT-login heeft een bekende toestemmingsfout bij de aanbieder. Identieke weergave of volledige compatibiliteit met andere apps wordt niet gegarandeerd.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## Hulp en bijdragen

Foutmeldingen, suggesties, vertalingen en code zijn welkom. Gebruik synthetische voorbeelden; publiceer geen persoonlijke documenten, sleutels of accountgegevens. Overige vragen: **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## Licentie en oorsprong

Onyou Office is een onafhankelijke fork van IeumOffice, dat op GenOffice is gebaseerd. Documentengines en veel functies komen uit die projecten, rhwp en hun bijdragers. We behouden de geschiedenis en auteurs en claimen niet alle geërfde functies zelf te hebben gemaakt. De broncode valt onder Apache-2.0; derden behouden hun voorwaarden. Merkrechten staan los hiervan. Er wordt geen verbondenheid of goedkeuring door oorspronkelijke projecten of aanbieders geclaimd.

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
