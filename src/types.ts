export const BINGO_SIZE = 4 // TODO: FFU make 5

export type BoardInstanceType = Record<string, BoardInstanceItemType>

export interface BoardInstanceItemType {
  id: string
  checked: boolean
  imageUrl?: string
  rating?: number
  isWin: boolean
  orderIndex: number // FFU
}

export const BANSKO_BOARD_ITEMS = [...'abcdefghijklmnopabcdefghijklmnopqrstuvwxyz']
  .slice(0, BINGO_SIZE * BINGO_SIZE)
  .map((index: string) => `item_${index}`)

export const WIN_PATTERNS = {
  3: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  4: [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
  ]
}

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
  url: string
  photoUrl: string
  placeId: string
  itemId?: string
  moreInfo?: string
}
