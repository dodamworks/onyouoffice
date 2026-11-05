<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>Tu oficina con agentes de IA.</strong></p>

<p align="center">
  <a href="../../../LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-2456FF" alt="License: Apache-2.0"></a>
  <a href="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml"><img src="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI on main"></a>
  <a href="https://github.com/dodamworks/onyouoffice/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/onyouoffice?style=flat&amp;label=GitHub%20stars&amp;color=2456FF" alt="GitHub stars"></a>
</p>

Abre un documento, describe los cambios y sigue trabajando en la misma ventana. Onyou Office reúne editores de documentos y agentes de IA en tu escritorio. Redacta y revisa con IA o edita por tu cuenta. La aplicación es gratuita y de código abierto; la IA es opcional.

<details>
<summary>Elige tu idioma · 21 idiomas</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · **Español** · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## Tus documentos en un solo espacio

- Edita diagramas de draw.io e importa archivos de Visio (.vsdx) como nuevos diagramas en tu equipo.
- Crea y edita documentos, hojas de cálculo, presentaciones y archivos Hangul (HWP/HWPX). También admite PDF, Markdown, HTML, mapas mentales y EPUB. La edición y la conversión varían según el formato.
- Pide cambios al asistente de IA, consulta los documentos seleccionados en Knowledge Vault y reúne instrucciones, memoria, archivos y conversaciones en proyectos.
- 21 idiomas de interfaz, temas claro y oscuro y tamaño de texto del chat ajustable. Onyou Office renueva la bienvenida, el inicio, los paneles de IA, los proyectos y Knowledge Vault, con marca y rutas de instalación y datos propias.

## Primeros pasos

Descarga los instaladores en [Releases](https://github.com/dodamworks/onyouoffice/releases/latest): Windows x64, macOS (Apple Silicon e Intel, beta) y Linux x64 (beta). Las actualizaciones son manuales por ahora. Para compilar necesitas Node.js 24, npm, Rust (`cargo`) y las herramientas nativas de tu plataforma.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

Abre o crea un documento desde Inicio. Para usar IA, elige una conexión en **Configuración → IA** y escribe una petición en el asistente del documento.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## IA, costes y datos

Puedes editar sin cuenta de IA. Las suscripciones, los cargos de API y los límites dependen del proveedor. Codex, Claude, ChatGPT directo, OpenRouter, Gemini, claves API e IA local tienen requisitos y disponibilidad distintos. La IA recibe el contenido relevante, los adjuntos y la conversación. Las versiones de desarrollo e instaladas usan carpetas de datos separadas.

[Privacy](../../../PRIVACY.md)

Se verificaron preguntas y conversaciones de seguimiento de Knowledge Vault con el programa oficial Codex. El inicio directo de ChatGPT presenta un error de consentimiento del proveedor. No se garantiza una representación idéntica ni compatibilidad completa con otras aplicaciones.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## Ayuda y contribuciones

Puedes aportar informes de errores, sugerencias, traducciones y código. Usa ejemplos sintéticos; no publiques documentos personales, claves ni datos de cuenta. Otras consultas: **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## Licencia y origen

Onyou Office es un fork independiente de IeumOffice, basado a su vez en GenOffice. Los motores y muchas funciones proceden de esos proyectos, rhwp y sus colaboradores. Conservamos los avisos de procedencia y autoría sin atribuirnos todas las funciones heredadas. El código usa Apache-2.0; los componentes de terceros conservan sus condiciones. Las marcas tienen derechos separados. No se afirma afiliación ni respaldo de proyectos originales o proveedores.

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
