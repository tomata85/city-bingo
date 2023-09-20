export const BINGO_SIZE = 4 // TODO: FFU make 5

export type BoardInstanceType = Record<string, BoardInstanceItemType>

export interface BoardInstanceItemType {
  id: string
  checked: boolean
  imageUrl?: string
  review?: string
  rating?: number
  orderIndex: number // FFU
}

export const BANSKO_BOARD_ITEMS = [...'abcdefghijklmnopabcdefghijklmnopqrstuvwxyz']
  .slice(0, BINGO_SIZE * BINGO_SIZE)
  .map((index: string) => `item_${index}`)

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

export interface User {
  name: string
  id: string
}

export interface Place {
  name: string
  googleMapsLink: string
  photoUrl: string
  placeId: string
  itemId?: string
  moreInfo?: string
}
