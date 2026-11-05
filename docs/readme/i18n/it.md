<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>Il tuo ufficio con agenti IA.</strong></p>

<p align="center">
  <a href="../../../LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-2456FF" alt="License: Apache-2.0"></a>
  <a href="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml"><img src="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI on main"></a>
  <a href="https://github.com/dodamworks/onyouoffice/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/onyouoffice?style=flat&amp;label=GitHub%20stars&amp;color=2456FF" alt="GitHub stars"></a>
</p>

Apri un documento, descrivi le modifiche e continua nella stessa finestra. Onyou Office unisce editor di documenti e agenti IA sul desktop. Crea bozze e revisioni con l’IA oppure modifica i file direttamente. L’app è gratuita e open source; l’IA è facoltativa.

<details>
<summary>Scegli la lingua · 21 lingue</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · **Italiano** · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## I documenti in un unico spazio

- Modifica diagrammi draw.io e importa localmente i file Visio (.vsdx) come nuovi diagrammi.
- Crea e modifica documenti, fogli di calcolo, presentazioni e file Hangul (HWP/HWPX). Sono supportati anche PDF, Markdown, HTML, mappe mentali ed EPUB. Modifica e conversione variano in base al formato.
- Chiedi modifiche all’assistente IA, interroga i documenti selezionati in Knowledge Vault e raccogli istruzioni, memoria, file e conversazioni nei progetti.
- 21 lingue dell’interfaccia, temi chiaro e scuro e testo della chat regolabile. Onyou Office rivede introduzione, pagina iniziale, pannelli IA, progetti e Knowledge Vault, con marchio e percorsi di installazione e dati propri.

## Per iniziare

Questa versione di sviluppo si compila dal codice sorgente. Non sono ancora disponibili installer ufficiali o un feed di aggiornamento. Esistono configurazioni per Windows, macOS e Linux; le piattaforme verificate saranno annunciate separatamente. Servono Node.js 24, npm, Rust (cargo) e gli strumenti di compilazione nativi del sistema.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

Apri o crea un documento dalla pagina iniziale. Per usare l’IA, scegli una connessione in **Impostazioni → IA** e scrivi una richiesta nell’assistente del documento.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## IA, costi e dati

La modifica non richiede un account IA. Abbonamenti, costi API e limiti dipendono dal fornitore. Codex, Claude, ChatGPT diretto, OpenRouter, Gemini, chiavi API e IA locale hanno requisiti e disponibilità diversi. L’IA riceve contenuti pertinenti, allegati e conversazioni. Le versioni di sviluppo e installate usano cartelle dati separate.

[Privacy](../../../PRIVACY.md)

Le domande e le conversazioni successive in Knowledge Vault sono state verificate con il programma ufficiale Codex. L’accesso diretto a ChatGPT presenta un errore nel consenso del fornitore. Non sono garantite resa identica o piena compatibilità con altre applicazioni.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## Aiuto e contributi

Sono benvenuti segnalazioni, proposte, traduzioni e codice. Usa esempi sintetici senza pubblicare documenti personali, chiavi o dati di account. Altre domande: **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## Licenza e origini

Onyou Office è un fork indipendente di IeumOffice, basato su GenOffice. I motori e molte funzioni derivano da questi progetti, rhwp e dai loro collaboratori. Ne conserviamo le indicazioni di provenienza e i crediti degli autori, senza attribuirci tutte le funzioni ereditate. Il sorgente è Apache-2.0; i componenti terzi mantengono le proprie condizioni. I marchi sono separati. Non si rivendica affiliazione o approvazione dei progetti originali o dei fornitori.

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
