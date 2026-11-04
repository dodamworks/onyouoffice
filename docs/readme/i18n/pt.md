<!-- Modified by Onyou Office on 2026-11-04. -->

# Onyou Office

**O seu escritório com agentes de IA.**

Abra um documento, descreva as alterações e continue na mesma janela. O Onyou Office reúne editores de documentos e agentes de IA no computador. Crie rascunhos e revise com IA ou edite por conta própria. O aplicativo é gratuito e de código aberto; a IA é opcional.

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · **Português** · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md)

## Documentos num só espaço

- Crie e edite documentos, planilhas, apresentações e arquivos Hangul (HWP/HWPX). Também há suporte a PDF, Markdown, HTML, mapas mentais e EPUB. Os recursos de edição e conversão variam por formato.
- Peça alterações ao assistente de IA, consulte documentos selecionados no Knowledge Vault e organize instruções, memória, arquivos e conversas em projetos.
- 21 idiomas de interface, temas claro e escuro e tamanho de texto do chat ajustável. O Onyou Office reformula a introdução, a tela inicial, os painéis de IA, os projetos e o Knowledge Vault, com marca e caminhos de instalação e dados próprios.

## Como começar

Esta versão de desenvolvimento é compilada a partir do código-fonte. Ainda não há instaladores oficiais nem feed de atualizações. Existem configurações para Windows, macOS e Linux; os destinos verificados serão anunciados separadamente. São necessários Node.js 24, npm, Rust (cargo) e as ferramentas nativas de compilação do sistema.

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

O Onyou Office é um fork independente do IeumOffice, baseado no GenOffice. Os motores e muitas funções vêm desses projetos, do rhwp e dos seus colaboradores. Preservamos o histórico e a autoria, sem reivindicar todas as funções herdadas. O código usa Apache-2.0; componentes de terceiros mantêm as suas condições. Marcas têm direitos separados. Não se afirma afiliação ou apoio dos projetos originais ou fornecedores.

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
