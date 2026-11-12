<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>Dein Office mit KI-Agenten.</strong></p>

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

Öffne ein Dokument, beschreibe die gewünschte Änderung und arbeite im selben Fenster weiter. Onyou Office verbindet Dokumenteditoren mit KI-Agenten auf deinem Desktop. Entwirf und überarbeite Texte mit KI oder bearbeite sie selbst. Die App ist kostenlos und Open Source; KI ist optional.

<details>
<summary>Sprache wählen · 21 Sprachen</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · **Deutsch** · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## Ein Arbeitsplatz für deine Dokumente

- Bearbeite draw.io-Diagramme und importiere Visio-Dateien (.vsdx) lokal als neue Diagramme.
- Erstelle und bearbeite Dokumente, Tabellen, Präsentationen und Hangul-Dateien (HWP/HWPX). Auch PDF, Markdown, HTML, Mindmaps und EPUB werden unterstützt. Bearbeitung und Konvertierung unterscheiden sich je nach Format.
- Bitte den KI-Assistenten um Änderungen, stelle in Knowledge Vault Fragen zu ausgewählten Dokumenten und sammle Anweisungen, Erinnerungen, Dateien und Gespräche in Projekten.
- 21 Oberflächensprachen, helle und dunkle Designs und anpassbare KI-Chatschrift. Onyou Office überarbeitet Einstieg, Startseite, KI-Panels, Projekte und Knowledge Vault und nutzt eigene Marken-, Installations- und Datenpfade.

## Erste Schritte

Lade die Installationsdateien unter [Releases](https://github.com/dodamworks/onyouoffice/releases/latest) herunter: Windows x64, macOS (Apple Silicon und Intel, Beta) und Linux x64 (Beta). Updates erfolgen derzeit manuell. Zum Bauen aus dem Quellcode brauchst du Node.js 24, npm, Rust (`cargo`) und die nativen Build-Werkzeuge deiner Plattform.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

Öffne oder erstelle ein Dokument auf der Startseite. Wähle für KI eine Verbindung unter **Einstellungen → KI** und gib im KI-Assistenten des Dokuments einen Auftrag ein.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## KI, Kosten und Daten

Dokumentbearbeitung erfordert kein KI-Konto. Abos, API-Kosten und Limits richten sich nach dem Anbieter. Codex, Claude, direkte ChatGPT-Anmeldung, OpenRouter, Gemini, API-Schlüssel und lokale KI haben unterschiedliche Voraussetzungen und Verfügbarkeit. Bei KI-Nutzung werden relevante Dokumentinhalte, Anhänge und Gespräche an den gewählten Anbieter gesendet. Entwicklung und installierte Version nutzen getrennte App-Datenordner.

[Privacy](../../../PRIVACY.md)

Knowledge-Vault-Fragen und Folgegespräche wurden mit dem offiziellen Codex-Programm geprüft. Die direkte ChatGPT-Anmeldung hat einen bekannten Zustimmungsfehler beim Anbieter. Identische Darstellung und vollständige Kompatibilität mit anderen Office-Apps sind nicht garantiert.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## Hilfe und Beiträge

Fehlerberichte, Vorschläge, Übersetzungen und Code sind willkommen. Verwende synthetische Beispiele statt persönlicher Dokumente, Schlüssel oder Kontodaten. Weitere Fragen: **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## Lizenz und Herkunft

Onyou Office ist ein unabhängiger Fork von IeumOffice auf Basis von GenOffice. Dokument-Engines und viele Bearbeitungsfunktionen stammen von diesen Projekten, rhwp und deren Mitwirkenden. Herkunfts- und Urheberangaben bleiben erhalten; wir beanspruchen nicht die Urheberschaft aller übernommenen Funktionen. Der Quellcode steht unter Apache-2.0, Drittkomponenten behalten ihre Bedingungen. Markenrechte sind separat. Eine Verbindung oder Unterstützung durch die Ursprungsprojekte oder Anbieter wird nicht behauptet.

[IeumOffice](https://github.com/pblsketch/ieumoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
