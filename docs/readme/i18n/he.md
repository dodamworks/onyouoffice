<!-- Modified by Onyou Office on 2026-11-04. -->

# Onyou Office

**סביבת העבודה שלך עם סוכני AI.**

פתחו מסמך, תארו מה תרצו לשנות והמשיכו באותו חלון. Onyou Office משלבת עורכי מסמכים וסוכני AI ביישום למחשב. אפשר להכין טיוטות ולערוך בעזרת AI או לעבוד לבד. היישום חינמי ובקוד פתוח; חיבור AI הוא לבחירתכם.

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · **עברית** · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md)

## כל המסמכים בסביבת עבודה אחת

- צרו וערכו מסמכים, גיליונות, מצגות וקובצי Hangul ‏(HWP/HWPX). יש תמיכה גם ב-PDF, Markdown, HTML, מפות חשיבה ו-EPUB. יכולות העריכה וההמרה משתנות לפי הפורמט.
- בקשו שינויים מעוזר ה-AI, שאלו על מסמכים נבחרים ב-Knowledge Vault ואספו הנחיות, זיכרון, קבצים ושיחות בפרויקטים.
- 21 שפות ממשק, ערכות נושא בהירות וכהות וגודל טקסט מתכוונן בצ׳אט AI. Onyou Office מעדכנת את ההיכרות הראשונית, הבית, לוחות ה-AI, הפרויקטים ו-Knowledge Vault, עם מיתוג ונתיבי התקנה ונתונים נפרדים.

## תחילת העבודה

זו גרסת פיתוח שבונים מקוד המקור. עדיין אין מתקינים רשמיים או ערוץ עדכונים. קיימות תצורות בנייה עבור Windows, macOS ו-Linux; יעדים מאומתים יפורסמו בנפרד. נדרשים Node.js 24, npm, Rust ‏(cargo) וכלי הבנייה של מערכת ההפעלה.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

פתחו או צרו מסמך בדף הבית. לשימוש ב-AI, בחרו חיבור ב-**הגדרות → AI** והקלידו בקשה בעוזר של המסמך.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## AI, עלויות ונתונים

עריכה אינה מחייבת חשבון AI. מנויים, חיובי API ומגבלות כפופים לתנאי הספק. לחיבורי Codex, Claude, ChatGPT ישיר, OpenRouter, Gemini, מפתח API ו-AI מקומי דרישות וזמינות שונות. תוכן רלוונטי, קבצים מצורפים ושיחות נשלחים לספק הנבחר. גרסאות פיתוח והתקנה משתמשות בתיקיות נתונים נפרדות.

[Privacy](../../../PRIVACY.md)

שאלות ושיחות המשך ב-Knowledge Vault נבדקו דרך תוכנית Codex הרשמית. בכניסה ישירה ל-ChatGPT יש שגיאת הסכמה ידועה אצל הספק. אין הבטחה לתצוגה זהה או לתאימות מלאה ליישומים אחרים.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## עזרה ותרומות

נשמח לדיווחי תקלות, הצעות, תרגומים וקוד. השתמשו בדוגמאות מלאכותיות; אל תפרסמו מסמכים אישיים, מפתחות או פרטי חשבון. לפניות אחרות: **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## רישיון ומקורות

Onyou Office היא הסתעפות עצמאית של IeumOffice, המבוססת על GenOffice. מנועי המסמכים ותכונות רבות הגיעו מפרויקטים אלה, מ-rhwp ומתורמי קוד פתוח. אנו שומרים על ההיסטוריה והיוצרים ולא מייחסים לעצמנו את כל התכונות שהתקבלו. קוד המקור ברישיון Apache-2.0; רכיבי צד שלישי שומרים על תנאיהם. זכויות סימני מסחר נפרדות. לא נטענת זיקה או תמיכה מצד פרויקטי המקור או ספקים.

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
