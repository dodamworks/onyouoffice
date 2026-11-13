// Modified by Onyou Office on 2026-10-31 for the independent Onyou Office local development build.
import type { Lang } from './index'

/**
 * Product identity: the ONE place the user-visible product name, the names
 * derived from it, and the public repository are defined.
 *
 * This product is based on the open-source GenOffice. Its dictionaries, help
 * topics and source keep writing "GenOffice" wherever the product names itself
 * (so they stay mergeable with upstream), and that name is swapped for the
 * product name at the point a string is produced: createI18n does it for every
 * translated string, brandText() for any other text shown to the user.
 *
 * To print the literal upstream name — the "based on GenOffice" acknowledgement —
 * write UPSTREAM_NAME_LITERAL, i.e. `{{GenOffice}}`, in the string.
 */

/** The upstream project this product is based on; also the token dictionaries use for the product name. */
export const UPSTREAM_PRODUCT_NAME = 'GenOffice'

/** Escape for a literal upstream name: brandText() turns `{{GenOffice}}` into `GenOffice`. */
export const UPSTREAM_NAME_LITERAL = `{{${UPSTREAM_PRODUCT_NAME}}}`

/**
 * The product name in every language without a localized one. Also the name
 * everything registered on the user's machine derives from (the installer's
 * productName, the userData folder, the default save folder), which must stay
 * the same whatever the UI language is.
 */
export const PRODUCT_NAME = 'Onyou Office'

/** Default document/project directory; independent of the display and app-data names. */
export const DEFAULT_DOCUMENTS_DIR_NAME = 'onyouoffice'

/** Languages that show a localized product name instead of PRODUCT_NAME. */
const LOCALIZED_PRODUCT_NAMES: Readonly<Record<string, string>> = {
  ko: '온유오피스',
}

/** The product name as shown in a UI language (a Lang or a raw locale tag). */
export function productName(lang: string | null | undefined): string {
  const base = lang?.trim().toLowerCase().split(/[-_]/)[0] ?? ''
  return Object.hasOwn(LOCALIZED_PRODUCT_NAMES, base)
    ? LOCALIZED_PRODUCT_NAMES[base]!
    : PRODUCT_NAME
}

/** Electron userData folder name of the installed app (under the per-user app-data root). */
export const USER_DATA_DIR_NAME = PRODUCT_NAME

/** userData folder name of an unpacked (development) run, kept apart from the installed app's. */
export const DEV_USER_DATA_DIR_NAME = `${PRODUCT_NAME}-Dev`

/**
 * Onyou Office's own public repository: the About field, "View on GitHub", and
 * the issue and release pages. Upstream attribution stays in NOTICE and the
 * README. This is not an update feed; PRODUCT_UPDATES_CONFIGURED controls that.
 */
export const PRODUCT_REPO_OWNER = 'dodamworks'
export const PRODUCT_REPO_NAME = 'onyouoffice'
/** `owner/repo`; the URLs built from it live in @genoffice/electron-utils (github-menu.ts) */
export const PRODUCT_REPO_SLUG = `${PRODUCT_REPO_OWNER}/${PRODUCT_REPO_NAME}`

/** The product's website: downloads, release notes and the step-by-step help pages. */
export const PRODUCT_WEBSITE = ''

/** Domain ownership is not an operating website or update distribution. */
export const PRODUCT_DOMAIN = 'onyouoffice.com'
export const PRODUCT_COMMAND = 'onyouoffice'
export const PRODUCT_UPDATES_CONFIGURED = false
export const PRODUCT_FEEDBACK_URL = ''

/** Where rights holders and users reach the maintainer about trademarks, copyright and licensing. */
export const PRODUCT_CONTACT_EMAIL = 'support@onyouoffice.com'

const NAME_TOKEN = new RegExp(`\\{\\{${UPSTREAM_PRODUCT_NAME}\\}\\}|${UPSTREAM_PRODUCT_NAME}`, 'g')

/** the name sits inside a longer identifier (GenOfficeFormField): not the product name */
function insideIdentifier(before: string, after: string): boolean {
  return /[A-Za-z0-9_]/.test(before) || /^[A-Za-z0-9]/.test(after)
}

/** the name is part of a file or folder name (GenOffice.exe, Documents/GenOffice, GenOffice-<v>.dmg) */
function insideFileName(before: string, after: string): boolean {
  return /[\\/]/.test(before) || /^(?:[\\/]|[-_][A-Za-z0-9<]|\.[A-Za-z0-9])/.test(after)
}

/**
 * Rewrite the product name in a UI string for a language: "GenOffice" becomes
 * productName(lang), except inside file and folder names, which carry
 * PRODUCT_NAME in every language. `{{GenOffice}}` prints the literal upstream
 * name. Text that does not mention the name is returned as is.
 */
export function brandText(text: string, lang: string | null | undefined): string {
  // Static templates only: parameters (including user paths) are inserted later.
  // Do not rewrite upstream URLs, attribution or internal package identifiers.
  text = text
    .replace(/(?<![A-Za-z0-9_./-])ieumoffice(?=$|[\s`])/g, PRODUCT_COMMAND)
    .replace(/(?<![A-Za-z0-9_])\.ieumoffice(?=[/\\`]|$)/g, '.onyouoffice')
  if (!text.includes(UPSTREAM_PRODUCT_NAME)) return text
  const localized = productName(lang)
  return text.replace(NAME_TOKEN, (match: string, offset: number) => {
    if (match !== UPSTREAM_PRODUCT_NAME) return UPSTREAM_PRODUCT_NAME
    const before = text.charAt(offset - 1)
    const after = text.slice(offset + match.length, offset + match.length + 2)
    if (insideIdentifier(before, after)) return match
    return insideFileName(before, after) ? PRODUCT_NAME : localized
  })
}

/** Shown while a website, update or feedback address is unset: never routed to upstream. */
const UNCONFIGURED_SERVICE: Readonly<Record<string, string>> = {
  zh: '此版本暂不提供此功能。新版本可在 GitHub Releases 下载。',
  en: 'This feature is not available in this version yet. New versions are on GitHub Releases.',
  vi: 'Tính năng này chưa có trong phiên bản này. Phiên bản mới có trên GitHub Releases.',
  ja: 'この機能はこのバージョンではまだ使えません。新しいバージョンは GitHub Releases から入手できます。',
  ko: '이 기능은 이 버전에서 아직 제공하지 않습니다. 새 버전은 GitHub 릴리스에서 받을 수 있습니다.',
  fr: 'Cette fonction n’est pas encore disponible dans cette version. Les nouvelles versions sont sur GitHub Releases.',
  de: 'Diese Funktion ist in dieser Version noch nicht verfügbar. Neue Versionen gibt es auf GitHub Releases.',
  es: 'Esta función aún no está disponible en esta versión. Las versiones nuevas están en GitHub Releases.',
  it: 'Questa funzione non è ancora disponibile in questa versione. Le nuove versioni sono su GitHub Releases.',
  pt: 'Este recurso ainda não está disponível nesta versão. As novas versões estão no GitHub Releases.',
  ru: 'Эта функция пока недоступна в этой версии. Новые версии публикуются на GitHub Releases.',
  ar: 'هذه الميزة غير متاحة بعد في هذا الإصدار. الإصدارات الجديدة متوفرة على GitHub Releases.',
  hi: 'यह सुविधा इस संस्करण में अभी उपलब्ध नहीं है। नए संस्करण GitHub Releases पर मिलते हैं।',
  th: 'ฟีเจอร์นี้ยังไม่มีในเวอร์ชันนี้ ดาวน์โหลดเวอร์ชันใหม่ได้ที่ GitHub Releases',
  id: 'Fitur ini belum tersedia di versi ini. Versi baru tersedia di GitHub Releases.',
  pl: 'Ta funkcja nie jest jeszcze dostępna w tej wersji. Nowe wersje są w GitHub Releases.',
  nl: 'Deze functie is nog niet beschikbaar in deze versie. Nieuwe versies staan op GitHub Releases.',
  cs: 'Tato funkce zatím v této verzi není k dispozici. Nové verze najdete na GitHub Releases.',
  ms: 'Ciri ini belum tersedia dalam versi ini. Versi baharu ada di GitHub Releases.',
  'zh-TW': '此版本尚未提供此功能。新版本可在 GitHub Releases 下載。',
  he: 'התכונה הזו עדיין לא זמינה בגרסה הזו. גרסאות חדשות נמצאות ב-GitHub Releases.',
  tr: 'Bu özellik bu sürümde henüz yok. Yeni sürümler GitHub Releases sayfasında.',
} satisfies Record<Lang, string>

export function productServiceUnavailable(lang: string): string {
  return (
    UNCONFIGURED_SERVICE[lang] ??
    UNCONFIGURED_SERVICE[lang.split(/[-_]/)[0]!] ??
    UNCONFIGURED_SERVICE.en!
  )
}
