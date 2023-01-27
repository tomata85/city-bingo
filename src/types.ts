export type UserBoardType = Record<string, BoardItemType>

export interface BoardItemType {
  index: number
  id: string
  text: string
  checked: boolean
}

export const BANSKO_BOARD_ITEMS = {
  bansko_1: 'Hot Springs',
  bansko_2: 'Hike Pirin mountains',
  bansko_3: 'Watch a sunset',
  bansko_4: 'Picnic in Pirin forest',
  bansko_5: 'Have a Banitza',
  bansko_6: 'Visit a co-work',
  bansko_7: 'Hike to Bezbog hut',
  bansko_8: 'Smoothie at Coconut',
  bansko_9: 'Belizmata lake'
}

/*
0,1,2
3,4,5
6,7,8
*/
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
