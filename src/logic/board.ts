import { BANSKO_BOARD_ITEMS, UserBoardType, WIN_PATTERNS } from '../types'

export function getInitialUserBoard (_: { userId: string, destinationId: string }): UserBoardType {
  const board: UserBoardType = {}
  Object.entries(BANSKO_BOARD_ITEMS).forEach((item, index) => {
    board[item[0]] = {
      index,
      id: item[0],
      text: item[1],
      checked: false
    }
  })

  return board
}

export function isBoardWin (board: UserBoardType): boolean {
  const checkedItemIndexs = Object.values(board)
    .filter((item) => item.checked)
    .map((item) => item.index)

  const isPatternMarkedInBoard = (pattern: number[]): boolean =>
    pattern.every(index => checkedItemIndexs.includes(index))

  const win = WIN_PATTERNS.some(pattern => isPatternMarkedInBoard(pattern))
  return win
}
