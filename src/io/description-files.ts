import { BANSKO_BOARD_ITEMS } from '../types'

export function getItemDescriptions (lang: string): Record<string, string> {
  const descriptions: any = {}
  BANSKO_BOARD_ITEMS.map(async (itemId: string) => {
    const res = await import(`../i18n/descriptions/${lang}/bansko/${itemId}.md`)
    const res2 = await fetch(res.default)
    const description = await res2.text()
    descriptions[itemId] = description
  })

  return descriptions
}

export async function getHowToPlayInstructions (lang: string): Promise<string> {
  const res = await import(`../i18n/descriptions/${lang}/how_to_play.md`)
  const res2 = await fetch(res.default)
  const howToPlay = await res2.text()
  return howToPlay
}
