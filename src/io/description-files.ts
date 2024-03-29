import { BANSKO_BOARD_ITEMS } from '../types'

export function getItemDescriptions (lang: string): Record<string, string> {
  const descriptions: any = {}
  BANSKO_BOARD_ITEMS.map(async (itemId: string) => {
    try {
      const res = await import(`../i18n/descriptions/${lang}/bansko/${itemId}.md`)
      const res2 = await fetch(res.default)
      const description = await res2.text()
      descriptions[itemId] = description
    } catch (e) {
      console.warn(e)
      descriptions[itemId] = ''
    }
  })

  return descriptions
}

export async function getMarkdownText (fileName: string, lang: string): Promise<string> {
  const res = await import(`../i18n/descriptions/${lang}/${fileName}.md`)
  const res2 = await fetch(res.default)
  const text = await res2.text()
  return text
}
