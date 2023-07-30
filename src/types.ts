export type BoardInstanceType = Record<string, BoardInstanceItemType>

export interface BoardInstanceItemType {
  id: string
  checked: boolean
  title: string // duplicated data
  order_index: number // FFU
}

export const BANSKO_BOARD_ITEMS = {
  item_a: 'Hot Springs',
  item_b: 'Hike Pirin mountains',
  item_c: 'Watch a sunset',
  item_d: 'Picnic in Pirin forest',
  item_e: 'Have a Banitza',
  item_f: 'Visit a co-work',
  item_g: 'Hike to Bezbog hut',
  item_h: 'Smoothie at Coconut',
  item_i: 'Belizmata lake'
}

export const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export interface PhotoProps {
  name: string
  media: any
}
