<!-- Modified by Onyou Office on 2026-11-04. -->

# Onyou Office

**Dein Office mit KI-Agenten.**

Öffne ein Dokument, beschreibe die gewünschte Änderung und arbeite im selben Fenster weiter. Onyou Office verbindet Dokumenteditoren mit KI-Agenten auf deinem Desktop. Entwirf und überarbeite Texte mit KI oder bearbeite sie selbst. Die App ist kostenlos und Open Source; KI ist optional.

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · **Deutsch** · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md)

## Ein Arbeitsplatz für deine Dokumente

- Erstelle und bearbeite Dokumente, Tabellen, Präsentationen und Hangul-Dateien (HWP/HWPX). Auch PDF, Markdown, HTML, Mindmaps und EPUB werden unterstützt. Bearbeitung und Konvertierung unterscheiden sich je nach Format.
- Bitte den KI-Assistenten um Änderungen, stelle in Knowledge Vault Fragen zu ausgewählten Dokumenten und sammle Anweisungen, Erinnerungen, Dateien und Gespräche in Projekten.
- 21 Oberflächensprachen, helle und dunkle Designs und anpassbare KI-Chatschrift. Onyou Office überarbeitet Einstieg, Startseite, KI-Panels, Projekte und Knowledge Vault und nutzt eigene Marken-, Installations- und Datenpfade.

## Erste Schritte

Diese Entwicklungsversion wird aus dem Quellcode gebaut. Offizielle Installationspakete und ein Update-Feed fehlen noch. Build-Konfigurationen für Windows, macOS und Linux sind vorhanden; geprüfte Veröffentlichungsziele werden separat bekannt gegeben. Benötigt werden Node.js 24, npm, Rust (cargo) und native Build-Werkzeuge des Betriebssystems.

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

Onyou Office ist ein unabhängiger Fork von IeumOffice auf Basis von GenOffice. Dokument-Engines und viele Bearbeitungsfunktionen stammen von diesen Projekten, rhwp und deren Mitwirkenden. Historie und Urheber bleiben erhalten; wir beanspruchen nicht die Urheberschaft aller übernommenen Funktionen. Der Quellcode steht unter Apache-2.0, Drittkomponenten behalten ihre Bedingungen. Markenrechte sind separat. Eine Verbindung oder Unterstützung durch die Ursprungsprojekte oder Anbieter wird nicht behauptet.

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
