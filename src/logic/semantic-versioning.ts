import packageJson from '../../package.json'

export const CURRENT_VERSION = packageJson.version

export function isBreakingChange (oldVersion: string): boolean {
  let breakingChange = false

  if (CURRENT_VERSION !== oldVersion) {
    const majorCurrentVersion = CURRENT_VERSION.split('.')[0]
    const majorOldVersion = oldVersion.split('.')[0]

    breakingChange = majorCurrentVersion > majorOldVersion
  }

  return breakingChange
}

export function compareVersions (v1: string, v2s: string): number {
  const v1Arr = v1.split('.')
  const v2Arr = v2s.split('.')
  const longestLength = (v1Arr.length > v2Arr.length) ? v1Arr.length : v2Arr.length
  for (let i = 0; i < longestLength; i++) {
    if (v1Arr[i] !== v2Arr[i]) {
      return (v1Arr > v2Arr) ? 1 : -1
    }
  }
  return 0
}
