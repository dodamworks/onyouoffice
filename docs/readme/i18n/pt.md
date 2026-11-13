<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>O seu escritório com agentes de IA.</strong></p>

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

Abra um documento, descreva as alterações e continue na mesma janela. O Onyou Office reúne editores de documentos e agentes de IA no computador. Crie rascunhos e revise com IA ou edite por conta própria. O aplicativo é gratuito e de código aberto; a IA é opcional.

<details>
<summary>Escolha seu idioma · 21 idiomas</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · **Português** · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## Documentos num só espaço

- Edite diagramas draw.io e importe arquivos Visio (.vsdx) localmente como novos diagramas.
- Crie e edite documentos, planilhas, apresentações e arquivos Hangul (HWP/HWPX). Também há suporte a PDF, Markdown, HTML, mapas mentais e EPUB. Os recursos de edição e conversão variam por formato.
- Peça alterações ao assistente de IA, consulte documentos selecionados no Knowledge Vault e organize instruções, memória, arquivos e conversas em projetos.
- 22 idiomas de interface, temas claro e escuro e tamanho de texto do chat ajustável. O Onyou Office reformula a introdução, a tela inicial, os painéis de IA, os projetos e o Knowledge Vault, com marca e caminhos de instalação e dados próprios.

## Como começar

Descarrega os instaladores em [Releases](https://github.com/dodamworks/onyouoffice/releases/latest): Windows x64, macOS (Apple Silicon e Intel, beta) e Linux x64 (beta). As atualizações são, por agora, manuais. Para compilar precisas de Node.js 24, npm, Rust (`cargo`) e das ferramentas nativas da plataforma.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

Abra ou crie um documento na tela inicial. Para usar IA, escolha uma conexão em **Configurações → IA** e digite um pedido no assistente do documento.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## IA, custos e dados

A edição não exige conta de IA. Assinaturas, custos de API e limites seguem as regras do fornecedor. Codex, Claude, ChatGPT direto, OpenRouter, Gemini, chaves de API e IA local têm requisitos e disponibilidade diferentes. Ao usar IA, conteúdo relevante, anexos e conversas são enviados ao fornecedor escolhido. As versões de desenvolvimento e instaladas usam pastas de dados separadas.

[Privacy](../../../PRIVACY.md)

Perguntas e conversas seguintes no Knowledge Vault foram verificadas com o programa oficial Codex. O login direto do ChatGPT apresenta um erro de consentimento do fornecedor. Não há garantia de renderização idêntica ou compatibilidade completa com outros aplicativos.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## Ajuda e contribuições

Erros, sugestões, traduções e código são bem-vindos. Use exemplos sintéticos e não publique documentos pessoais, chaves ou dados de conta. Outras dúvidas: **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## Licença e origens

O Onyou Office é um fork independente do IeumOffice, baseado no GenOffice. Os motores e muitas funções vêm desses projetos, do rhwp e dos seus colaboradores. Preservamos as indicações de origem e autoria, sem reivindicar todas as funções herdadas. O código usa Apache-2.0; componentes de terceiros mantêm as suas condições. Marcas têm direitos separados. Não se afirma afiliação ou apoio dos projetos originais ou fornecedores.

[IeumOffice](https://github.com/pblsketch/ieumoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
