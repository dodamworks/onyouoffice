<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>Votre bureau, avec des agents IA.</strong></p>

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

Ouvrez un document, décrivez les changements souhaités et continuez dans la même fenêtre. Onyou Office réunit éditeurs de documents et agents IA sur votre ordinateur. Rédigez et révisez avec l’IA, ou modifiez vous-même vos fichiers. L’application est gratuite et open source ; l’IA reste facultative.

<details>
<summary>Choisir une langue · 21 langues</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · **Français** · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## Vos documents au même endroit

- Modifiez des diagrammes draw.io et importez localement des fichiers Visio (.vsdx) comme nouveaux diagrammes.
- Créez et modifiez documents, feuilles de calcul, présentations et fichiers Hangul (HWP/HWPX). PDF, Markdown, HTML, cartes mentales et EPUB sont aussi pris en charge. Les possibilités d’édition et de conversion dépendent du format.
- Demandez des modifications à l’assistant IA, interrogez les documents choisis dans Knowledge Vault et regroupez consignes, mémoire, fichiers et conversations dans des projets.
- 21 langues d’interface, thèmes clair et sombre et taille du texte des discussions IA réglable. Onyou Office retravaille l’accueil, la première utilisation, les panneaux IA, les projets et Knowledge Vault, avec une identité et des chemins d’installation et de données distincts.

## Premiers pas

Télécharge les fichiers dans [Releases](https://github.com/dodamworks/onyouoffice/releases/latest) : Windows x64, macOS (Apple Silicon et Intel, bêta) et Linux x64 (bêta). Les mises à jour sont manuelles pour le moment. Pour compiler, il faut Node.js 24, npm, Rust (`cargo`) et les outils natifs de ta plateforme.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

Ouvrez ou créez un document depuis l’accueil. Pour l’IA, choisissez une connexion dans **Paramètres → IA**, puis saisissez une demande dans l’assistant du document.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## IA, coûts et données

L’édition ne nécessite pas de compte IA. Abonnements, frais API et limites dépendent du fournisseur choisi. Les connexions Codex, Claude, ChatGPT direct, OpenRouter, Gemini, par clé API et à une IA locale ont des exigences et disponibilités différentes. L’IA reçoit le contenu pertinent des documents, les pièces jointes et la conversation. Les versions de développement et installées utilisent des dossiers de données distincts.

[Privacy](../../../PRIVACY.md)

Les questions et échanges suivants dans Knowledge Vault ont été vérifiés avec le programme officiel Codex. La connexion directe ChatGPT présente une erreur de consentement du fournisseur. Ni un rendu identique ni une compatibilité complète avec d’autres suites ne sont garantis.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## Aide et contributions

Bugs, suggestions, traductions et code sont les bienvenus. Utilisez des exemples synthétiques, sans documents personnels, clés ni données de compte. Autres questions : **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## Licence et origines

Onyou Office est un fork indépendant d’IeumOffice, lui-même basé sur GenOffice. Les moteurs et de nombreuses fonctions viennent de ces projets, de rhwp et de leurs contributeurs. Nous conservons les mentions de provenance et les crédits des auteurs sans revendiquer toutes les fonctions héritées. Le code relève d’Apache-2.0 ; les composants tiers gardent leurs conditions. Les marques sont distinctes. Aucune affiliation ni approbation des projets amont ou fournisseurs n’est revendiquée.

[IeumOffice](https://github.com/pblsketch/ieumoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
