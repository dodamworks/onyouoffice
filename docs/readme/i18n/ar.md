<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>مكتبك مع وكلاء الذكاء الاصطناعي.</strong></p>

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

افتح مستندًا، وصف التغيير المطلوب، ثم واصل العمل في النافذة نفسها. يجمع Onyou Office محررات المستندات ووكلاء الذكاء الاصطناعي في تطبيق سطح مكتب. أنشئ المسودات وراجعها بالذكاء الاصطناعي أو حررها بنفسك. التطبيق مجاني ومفتوح المصدر، والذكاء الاصطناعي اختياري.

<details>
<summary>اختر لغتك · 21 لغة</summary>

[English](../../../README.md) · **العربية** · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## مساحة واحدة لمستنداتك

- حرّر مخططات draw.io واستورد ملفات Visio (.vsdx) كمخططات جديدة على هذا الجهاز.
- أنشئ المستندات وجداول البيانات والعروض وملفات Hangul ‏(HWP/HWPX) وحررها. يدعم التطبيق أيضًا PDF وMarkdown وHTML والخرائط الذهنية وEPUB. تختلف إمكانات التحرير والتحويل حسب التنسيق.
- اطلب تعديلات من مساعد الذكاء الاصطناعي، واسأل عن المستندات المحددة في Knowledge Vault، واجمع التعليمات والذاكرة والملفات والمحادثات ضمن المشاريع.
- 21 لغة للواجهة، ومظهر فاتح وداكن، وحجم نص قابل للضبط في محادثة الذكاء الاصطناعي. يحسن Onyou Office البداية والصفحة الرئيسية ولوحات الذكاء الاصطناعي والمشاريع وKnowledge Vault، مع هوية ومسارات تثبيت وبيانات مستقلة.

## البدء

نزّل ملفات التثبيت من [الإصدارات](https://github.com/dodamworks/onyouoffice/releases/latest): Windows x64 وmacOS ‏(Apple Silicon وIntel، تجريبي) وLinux x64 ‏(تجريبي). التحديث يدوي حاليًا. للبناء من المصدر تحتاج إلى Node.js 24 وnpm وRust (`cargo`) وأدوات البناء الأصلية لنظامك.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

افتح ملفًا أو أنشئ مستندًا من الصفحة الرئيسية. لاستخدام الذكاء الاصطناعي، اختر اتصالًا في **الإعدادات → AI** ثم اكتب طلبًا في مساعد المستند.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## الذكاء الاصطناعي والتكاليف والبيانات

لا يحتاج التحرير إلى حساب ذكاء اصطناعي. تخضع الاشتراكات ورسوم API والحدود لشروط المزود. تتوفر مسارات Codex وClaude وتسجيل ChatGPT المباشر وOpenRouter وGemini ومفاتيح API والذكاء الاصطناعي المحلي بمتطلبات وتوافر مختلفين. تُرسل المحتويات ذات الصلة والمرفقات والمحادثات إلى المزود المحدد. تستخدم نسخ التطوير والتثبيت مجلدات بيانات منفصلة.

[Privacy](../../../PRIVACY.md)

تم التحقق من الأسئلة والمحادثات اللاحقة في Knowledge Vault عبر برنامج Codex الرسمي. ما زال تسجيل ChatGPT المباشر يواجه خطأ موافقة لدى المزود. لا نضمن عرضًا مطابقًا أو توافقًا كاملًا مع التطبيقات الأخرى.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## المساعدة والمساهمة

نرحب بتقارير الأخطاء والاقتراحات والترجمات والشيفرة. استخدم أمثلة مصطنعة، ولا تنشر مستندات شخصية أو مفاتيح أو بيانات حساب. للاستفسارات الأخرى: **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## الترخيص والأصول

Onyou Office تفرع مستقل من IeumOffice المبني على GenOffice. تأتي محركات المستندات ووظائف كثيرة من هذه المشاريع وrhwp ومساهمي المصادر المفتوحة. نحافظ على إشعارات المصدر ونسبة العمل إلى مؤلفيه ولا ننسب كل الوظائف الموروثة لأنفسنا. المصدر بترخيص Apache-2.0، وتحتفظ المكونات الخارجية بشروطها. حقوق العلامات التجارية منفصلة. لا ندعي ارتباطًا أو تأييدًا من المشاريع الأصلية أو المزودين.

[IeumOffice](https://github.com/pblsketch/ieumoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
