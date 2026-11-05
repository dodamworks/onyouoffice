// Modified by Onyou Office on 2026-10-31 for the independent Onyou Office local development build.
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { appBinaryForResources } from '../src/resources'

describe('appBinaryForResources', () => {
  it('finds the app in a custom Windows install directory', () => {
    expect(appBinaryForResources(join('D:\\Apps\\Onyou Office', 'resources'), 'win32')).toBe(
      join('D:\\Apps\\Onyou Office', 'Onyou Office.exe'),
    )
  })

  it('resolves the same binary for the default Windows install directory', () => {
    const localAppData = 'C:\\Users\\test\\AppData\\Local'
    const resources = join(localAppData, 'Programs', 'Onyou Office', 'resources')
    expect(appBinaryForResources(resources, 'win32')).toBe(
      join(localAppData, 'Programs', 'Onyou Office', 'Onyou Office.exe'),
    )
  })

  it('finds the app in a custom macOS bundle location', () => {
    expect(
      appBinaryForResources(join('/Volumes/Work/Onyou Office.app/Contents/Resources'), 'darwin'),
    ).toBe(join('/Volumes/Work/Onyou Office.app/Contents/MacOS/Onyou Office'))
  })

  it('finds the app in a custom Linux prefix', () => {
    expect(appBinaryForResources(join('/opt/onyouoffice-custom/resources'), 'linux')).toBe(
      join('/opt/onyouoffice-custom/onyouoffice'),
    )
  })
})
