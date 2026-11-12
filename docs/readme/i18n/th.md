<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>ออฟฟิศของคุณ พร้อมเอเจนต์ AI</strong></p>

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

เปิดเอกสาร บอกสิ่งที่ต้องการแก้ แล้วทำงานต่อในหน้าต่างเดิม Onyou Office รวมตัวแก้ไขเอกสารและเอเจนต์ AI ไว้บนเดสก์ท็อป ใช้ AI ร่างและปรับแก้ หรือแก้ไขด้วยตัวเองก็ได้ แอปฟรีและเป็นโอเพนซอร์ส การเชื่อมต่อ AI เป็นทางเลือก

<details>
<summary>เลือกภาษา · 21 ภาษา</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · **ไทย** · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## เอกสารทั้งหมดในพื้นที่เดียว

- แก้ไขไดอะแกรม draw.io และนำเข้าไฟล์ Visio (.vsdx) เป็นไดอะแกรมใหม่ภายในคอมพิวเตอร์นี้
- สร้างและแก้ไขเอกสาร สเปรดชีต งานนำเสนอ และ Hangul (HWP/HWPX) รวมถึงใช้งาน PDF, Markdown, HTML, แผนผังความคิด และ EPUB ความสามารถในการแก้ไขและแปลงขึ้นอยู่กับรูปแบบไฟล์
- ขอให้ผู้ช่วย AI แก้ไขเอกสาร ถามเกี่ยวกับเอกสารที่เลือกใน Knowledge Vault และรวมคำสั่ง ความจำ ไฟล์ และบทสนทนาไว้ในโครงการ
- รองรับส่วนติดต่อ 21 ภาษา ธีมสว่างและมืด และการปรับขนาดข้อความแชต AI โดย Onyou Office ปรับปรุงการเริ่มต้น หน้าหลัก แผง AI โครงการ และ Knowledge Vault พร้อมแบรนด์และเส้นทางติดตั้งและข้อมูลของตนเอง

## เริ่มต้นใช้งาน

ดาวน์โหลดตัวติดตั้งได้จาก [Releases](https://github.com/dodamworks/onyouoffice/releases/latest): Windows x64, macOS (Apple Silicon และ Intel รุ่นเบตา) และ Linux x64 (รุ่นเบตา) ขณะนี้ต้องอัปเดตด้วยตนเอง หากต้องการบิลด์จากซอร์ส ต้องมี Node.js 24, npm, Rust (`cargo`) และเครื่องมือบิลด์ของระบบปฏิบัติการ

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

เปิดไฟล์หรือสร้างเอกสารจากหน้าหลัก หากต้องการ AI ให้เลือกการเชื่อมต่อใน **การตั้งค่า → AI** แล้วพิมพ์คำขอในผู้ช่วยของเอกสาร

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## AI ค่าใช้จ่าย และข้อมูล

แก้ไขเอกสารได้โดยไม่ต้องมีบัญชี AI ค่าสมัคร ค่า API และขีดจำกัดเป็นไปตามเงื่อนไขผู้ให้บริการ ช่องทาง Codex, Claude, ChatGPT โดยตรง, OpenRouter, Gemini, คีย์ API และ AI ในเครื่องมีข้อกำหนดและความพร้อมต่างกัน เนื้อหาเอกสารที่เกี่ยวข้อง ไฟล์แนบ และบทสนทนาจะส่งให้ผู้ให้บริการที่เลือก รุ่นพัฒนาและรุ่นติดตั้งใช้โฟลเดอร์ข้อมูลแยกกัน

[Privacy](../../../PRIVACY.md)

ตรวจสอบคำถามและบทสนทนาต่อเนื่องใน Knowledge Vault ผ่านโปรแกรม Codex อย่างเป็นทางการแล้ว การเข้าสู่ ChatGPT โดยตรงยังมีข้อผิดพลาดขั้นตอนยินยอมของผู้ให้บริการ ไม่รับประกันการแสดงผลเหมือนกันหรือความเข้ากันได้ครบถ้วนกับแอปอื่น

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## ความช่วยเหลือและการมีส่วนร่วม

ยินดีรับรายงานข้อผิดพลาด ข้อเสนอแนะ คำแปล และโค้ด โปรดใช้ตัวอย่างจำลอง อย่าเผยแพร่เอกสารส่วนตัว คีย์ หรือข้อมูลบัญชี คำถามอื่นติดต่อ **support@onyouoffice.com**

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## สัญญาอนุญาตและที่มา

Onyou Office เป็นฟอร์กอิสระของ IeumOffice ซึ่งอิง GenOffice เอนจินเอกสารและฟังก์ชันจำนวนมากมาจากโครงการเหล่านี้ rhwp และผู้ร่วมพัฒนาโอเพนซอร์ส เรารักษาข้อมูลแหล่งที่มาและเครดิตผู้สร้างเดิม ไม่อ้างว่าสร้างฟังก์ชันที่รับมาทั้งหมดเอง ซอร์สใช้ Apache-2.0 ส่วนประกอบภายนอกคงเงื่อนไขของตน สิทธิ์เครื่องหมายการค้าแยกต่างหาก ไม่อ้างความเกี่ยวข้องหรือการรับรองจากโครงการต้นทางหรือผู้ให้บริการ

[IeumOffice](https://github.com/pblsketch/ieumoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
