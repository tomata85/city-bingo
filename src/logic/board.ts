import { BANSKO_BOARD_ITEMS, BoardInstanceType, WIN_PATTERNS } from '../types'

export function generateBoardInstance (_: {
  userId: string
  destinationId: string
}): BoardInstanceType {
  const board: BoardInstanceType = {}
  Object.entries(BANSKO_BOARD_ITEMS).forEach((item, index) => {
    board[item[0]] = {
      orderIndex: index,
      id: item[0],
      checked: false
    }
  })

  return board
}

export function isBoardWin (board: BoardInstanceType): boolean {
  const checkedItemIndexs = Object.values(board)
    .filter((item) => item.checked)
    .map((item) => item.orderIndex)

  const isPatternMarkedInBoard = (pattern: number[]): boolean =>
    pattern.every(index => checkedItemIndexs.includes(index))

  const win = WIN_PATTERNS.some(pattern => isPatternMarkedInBoard(pattern))
  return win
}
