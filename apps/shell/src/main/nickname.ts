import { NICKNAME_KEY, normalizeNickname } from '../shared/nickname'
import { readAppSettings, writeAppSetting } from './app-settings'

export function readNickname(path: string): string {
  return normalizeNickname(readAppSettings(path)[NICKNAME_KEY])
}

export function writeNickname(path: string, raw: unknown): string {
  if (typeof raw !== 'string') throw new Error('Invalid nickname.')
  const value = normalizeNickname(raw)
  if (value !== readNickname(path)) writeAppSetting(path, NICKNAME_KEY, value)
  return value
}
