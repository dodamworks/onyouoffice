<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>Votre bureau, avec des agents IA.</strong></p>

<p align="center">
  <a href="../../../LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-2456FF" alt="License: Apache-2.0"></a>
  <a href="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml"><img src="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI on main"></a>
  <a href="https://github.com/dodamworks/onyouoffice/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/onyouoffice?style=flat&amp;label=GitHub%20stars&amp;color=2456FF" alt="GitHub stars"></a>
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

Cette version de développement se compile à partir du code source. Aucun installateur officiel ni flux de mises à jour n’est encore disponible. Des configurations Windows, macOS et Linux existent ; les cibles vérifiées seront annoncées séparément. Prévoyez Node.js 24, npm, Rust (cargo) et les outils natifs de compilation de votre système.

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

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
