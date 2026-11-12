<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>AI एजेंट के साथ आपका अपना ऑफिस।</strong></p>

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

दस्तावेज़ खोलें, बताएं कि क्या बदलना है और उसी विंडो में काम जारी रखें। Onyou Office डेस्कटॉप पर दस्तावेज़ संपादकों और AI एजेंट को एक साथ लाता है। AI से मसौदा और संशोधन कराएं या खुद संपादित करें। ऐप मुफ़्त और ओपन सोर्स है; AI जोड़ना वैकल्पिक है।

<details>
<summary>अपनी भाषा चुनें · 21 भाषाएँ</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · **हिन्दी** · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## दस्तावेज़ों के लिए एक जगह

- draw.io आरेख संपादित करें और Visio (.vsdx) फ़ाइलों को अपने कंप्यूटर पर नए आरेखों के रूप में आयात करें।
- दस्तावेज़, स्प्रेडशीट, प्रस्तुतियां और Hangul (HWP/HWPX) बनाएं और संपादित करें। PDF, Markdown, HTML, माइंड मैप और EPUB भी समर्थित हैं। संपादन और रूपांतरण की क्षमता फ़ॉर्मैट पर निर्भर है।
- AI सहायक से बदलाव कराएं, Knowledge Vault में चुने दस्तावेज़ों पर सवाल पूछें और प्रोजेक्ट में निर्देश, मेमोरी, फ़ाइलें और बातचीत साथ रखें।
- 21 इंटरफ़ेस भाषाएं, हल्की और गहरी थीम तथा AI चैट के अक्षरों का आकार बदलने की सुविधा। Onyou Office शुरुआती परिचय, होम, AI पैनल, प्रोजेक्ट और Knowledge Vault को सुधारता है और अपनी ब्रांडिंग तथा अलग इंस्टॉलेशन और डेटा पथ रखता है।

## शुरू करें

[Releases](https://github.com/dodamworks/onyouoffice/releases/latest) से इंस्टॉलर डाउनलोड करें: Windows x64, macOS (Apple Silicon और Intel, बीटा) तथा Linux x64 (बीटा)। अभी अपडेट मैन्युअल हैं। सोर्स से बनाने के लिए Node.js 24, npm, Rust (`cargo`) और अपने प्लेटफ़ॉर्म के नेटिव बिल्ड टूल चाहिए।

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

होम से फ़ाइल खोलें या दस्तावेज़ बनाएं। AI के लिए **सेटिंग → AI** में कनेक्शन चुनें और दस्तावेज़ के AI सहायक में अनुरोध लिखें।

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## AI, लागत और डेटा

संपादन के लिए AI खाते की ज़रूरत नहीं है। सदस्यता, API शुल्क और सीमाएं प्रदाता की शर्तों के अनुसार हैं। Codex, Claude, सीधे ChatGPT लॉगिन, OpenRouter, Gemini, API कुंजी और स्थानीय AI के रास्तों की आवश्यकताएं और उपलब्धता अलग हैं। संबंधित दस्तावेज़ सामग्री, अटैचमेंट और बातचीत चुने प्रदाता को भेजे जाते हैं। विकास और इंस्टॉल किए संस्करण अलग डेटा फ़ोल्डर उपयोग करते हैं।

[Privacy](../../../PRIVACY.md)

आधिकारिक Codex प्रोग्राम से Knowledge Vault के सवाल और आगे की बातचीत जांची गई है। सीधे ChatGPT लॉगिन में प्रदाता की सहमति संबंधी त्रुटि बनी हुई है। एक जैसा प्रदर्शन या अन्य ऐप से पूर्ण अनुकूलता की गारंटी नहीं है।

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## सहायता और योगदान

बग रिपोर्ट, सुझाव, अनुवाद और कोड का स्वागत है। कृत्रिम उदाहरण उपयोग करें; निजी दस्तावेज़, कुंजियां या खाता विवरण सार्वजनिक न करें। अन्य सवाल: **support@onyouoffice.com**।

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## लाइसेंस और स्रोत

Onyou Office, IeumOffice का स्वतंत्र फ़ोर्क है, जो GenOffice पर आधारित है। दस्तावेज़ इंजन और कई सुविधाएं इन प्रोजेक्ट, rhwp और ओपन सोर्स योगदानकर्ताओं से मिली हैं। हम मूल स्रोत और लेखकों का श्रेय बनाए रखते हैं और सभी विरासत सुविधाएं खुद बनाने का दावा नहीं करते। सोर्स Apache-2.0 के अंतर्गत है; तृतीय-पक्ष घटकों की शर्तें अलग हैं। ट्रेडमार्क अधिकार अलग हैं। मूल प्रोजेक्ट या प्रदाताओं से संबद्धता या समर्थन का दावा नहीं है।

[IeumOffice](https://github.com/pblsketch/ieumoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
