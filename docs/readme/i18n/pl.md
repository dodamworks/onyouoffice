<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>Twoje biuro z agentami AI.</strong></p>

<p align="center">
  <a href="../../../LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-2456FF" alt="License: Apache-2.0"></a>
  <a href="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml"><img src="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI on main"></a>
  <a href="https://github.com/dodamworks/onyouoffice/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/onyouoffice?style=flat&amp;label=GitHub%20stars&amp;color=2456FF" alt="GitHub stars"></a>
</p>

Otwórz dokument, opisz potrzebne zmiany i pracuj dalej w tym samym oknie. Onyou Office łączy edytory dokumentów z agentami AI na komputerze. Twórz i poprawiaj tekst z AI lub edytuj samodzielnie. Aplikacja jest bezpłatna i otwartoźródłowa; AI jest opcjonalne.

<details>
<summary>Wybierz język · 21 języków</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · **Polski** · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## Dokumenty w jednym miejscu

- Edytuj diagramy draw.io i importuj lokalnie pliki Visio (.vsdx) jako nowe diagramy.
- Twórz i edytuj dokumenty, arkusze, prezentacje i pliki Hangul (HWP/HWPX). Obsługiwane są też PDF, Markdown, HTML, mapy myśli i EPUB. Zakres edycji i konwersji zależy od formatu.
- Zlecaj zmiany asystentowi AI, pytaj o wybrane dokumenty w Knowledge Vault i zbieraj instrukcje, pamięć, pliki oraz rozmowy w projektach.
- 21 języków interfejsu, jasny i ciemny motyw oraz regulowany tekst czatu AI. Onyou Office porządkuje pierwsze uruchomienie, ekran główny, panele AI, projekty i Knowledge Vault, z własną marką i ścieżkami instalacji oraz danych.

## Pierwsze kroki

Pobierz instalatory z [Releases](https://github.com/dodamworks/onyouoffice/releases/latest): Windows x64, macOS (Apple Silicon i Intel, beta) oraz Linux x64 (beta). Aktualizacje są na razie ręczne. Do kompilacji potrzebujesz Node.js 24, npm, Rust (`cargo`) i natywnych narzędzi swojej platformy.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

Otwórz lub utwórz dokument na ekranie głównym. Dla AI wybierz połączenie w **Ustawienia → AI** i wpisz polecenie w asystencie dokumentu.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## AI, koszty i dane

Edycja nie wymaga konta AI. Abonamenty, opłaty API i limity zależą od dostawcy. Codex, Claude, bezpośrednie logowanie ChatGPT, OpenRouter, Gemini, klucze API i lokalna AI mają różne wymagania i dostępność. Istotna treść dokumentów, załączniki i rozmowy trafiają do wybranego dostawcy. Wersje rozwojowe i instalowane używają osobnych folderów danych.

[Privacy](../../../PRIVACY.md)

Pytania i dalsze rozmowy w Knowledge Vault sprawdzono w oficjalnym programie Codex. Bezpośrednie logowanie ChatGPT ma znany błąd zgody dostawcy. Nie gwarantujemy identycznego renderowania ani pełnej zgodności z innymi aplikacjami.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## Pomoc i współpraca

Zapraszamy do zgłaszania błędów, propozycji, tłumaczeń i kodu. Używaj sztucznych przykładów zamiast dokumentów osobistych, kluczy lub danych konta. Inne pytania: **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## Licencja i pochodzenie

Onyou Office jest niezależnym forkiem IeumOffice, opartego na GenOffice. Silniki i wiele funkcji pochodzą z tych projektów, rhwp i od ich współtwórców. Zachowujemy informacje o pochodzeniu i autorach, nie przypisując sobie wszystkich odziedziczonych funkcji. Kod jest na Apache-2.0; komponenty zewnętrzne zachowują własne warunki. Znaki towarowe są odrębne. Nie deklarujemy powiązania ani poparcia projektów źródłowych lub dostawców.

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
