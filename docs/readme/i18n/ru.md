<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>Ваш офис с ИИ-агентами.</strong></p>

<p align="center">
  <a href="../../../LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-2456FF" alt="License: Apache-2.0"></a>
  <a href="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml"><img src="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI on main"></a>
  <a href="https://github.com/dodamworks/onyouoffice/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/onyouoffice?style=flat&amp;label=GitHub%20stars&amp;color=2456FF" alt="GitHub stars"></a>
</p>

Откройте документ, опишите нужные изменения и продолжайте в том же окне. Onyou Office объединяет редакторы документов и ИИ-агентов на компьютере. Создавайте черновики и правьте текст с ИИ или самостоятельно. Приложение бесплатное, с открытым кодом; подключение ИИ необязательно.

<details>
<summary>Выбрать язык · 21 язык</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · **Русский** · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## Документы в одном рабочем пространстве

- Редактируйте диаграммы draw.io и импортируйте файлы Visio (.vsdx) как новые диаграммы на своём компьютере.
- Создавайте и редактируйте документы, таблицы, презентации и Hangul (HWP/HWPX). Поддерживаются также PDF, Markdown, HTML, интеллект-карты и EPUB. Возможности редактирования и преобразования зависят от формата.
- Поручайте изменения ИИ-помощнику, задавайте вопросы по выбранным документам в Knowledge Vault и собирайте инструкции, память, файлы и беседы в проектах.
- 21 язык интерфейса, светлая и тёмная темы, настройка размера текста ИИ-чата. Onyou Office перерабатывает первое знакомство, главный экран, панели ИИ, проекты и Knowledge Vault, используя собственный бренд и отдельные пути установки и данных.

## Начало работы

Это версия для разработки, собираемая из исходников. Официальных установщиков и канала обновлений пока нет. Есть конфигурации для Windows, macOS и Linux; проверенные платформы будут объявлены отдельно. Нужны Node.js 24, npm, Rust (cargo) и системные инструменты сборки.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

Откройте или создайте документ на главном экране. Для ИИ выберите подключение в **Настройки → ИИ**, затем введите запрос в помощнике документа.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## ИИ, расходы и данные

Для редактирования учётная запись ИИ не нужна. Подписки, плата за API и лимиты зависят от поставщика. Codex, Claude, прямой вход ChatGPT, OpenRouter, Gemini, API-ключи и локальный ИИ имеют разные требования и доступность. Нужное содержимое документов, вложения и беседа передаются выбранному поставщику. Версии для разработки и установленные сборки используют отдельные папки данных.

[Privacy](../../../PRIVACY.md)

Вопросы и последующие беседы Knowledge Vault проверены через официальную программу Codex. У прямого входа ChatGPT остаётся ошибка согласия поставщика. Одинаковое отображение и полная совместимость с другими приложениями не гарантируются.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## Помощь и участие

Приветствуются сообщения об ошибках, предложения, переводы и код. Используйте искусственные примеры; не публикуйте личные документы, ключи и сведения об аккаунтах. Другие вопросы: **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## Лицензия и происхождение

Onyou Office — независимый форк IeumOffice, основанного на GenOffice. Движки и многие функции созданы этими проектами, rhwp и их участниками. Мы сохраняем указания на источник и авторство, не приписывая себе все унаследованные функции. Исходники распространяются под Apache-2.0, сторонние компоненты сохраняют свои условия. Права на товарные знаки отдельны. Связь или поддержка со стороны исходных проектов и поставщиков не заявляется.

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
