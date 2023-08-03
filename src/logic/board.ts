import { BANSKO_BOARD_ITEMS, BoardInstanceType, WIN_PATTERNS } from '../types'

export function getInitialUserBoard (_: {
  userId: string
  destinationId: string
}): BoardInstanceType {
  const board: BoardInstanceType = {}
  Object.entries(BANSKO_BOARD_ITEMS).forEach((item, index) => {
    board[item[0]] = {
      order_index: index,
      id: item[0],
      checked: false
    }
  })

  return board
}

export function isBoardWin (board: BoardInstanceType): boolean {
  const checkedItemIndexs = Object.values(board)
    .filter((item) => item.checked)
    .map((item) => item.order_index)

  const isPatternMarkedInBoard = (pattern: number[]): boolean =>
    pattern.every(index => checkedItemIndexs.includes(index))

  const win = WIN_PATTERNS.some(pattern => isPatternMarkedInBoard(pattern))
  return win
}
