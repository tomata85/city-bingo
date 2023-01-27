import { BANSKO_BOARD_ITEMS, UserBoardType, WIN_PATTERNS } from './types'

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

export function getBoardFromStorage (): UserBoardType | undefined {
  const board = localStorage.getItem('board')

  if (board === '{}' || board === null) {
    return undefined
  } return JSON.parse(board)
}

export function storeBoard (board: UserBoardType): void {
  localStorage.setItem('board', JSON.stringify(board))
}

export function isBoardWin (board: UserBoardType): boolean {
  const checkedItemIndexs = Object.values(board)
    .filter((item) => item.checked)
    .map((item) => item.index)
  console.log(checkedItemIndexs)

  const isPatternMarkedInBoard = (pattern: number[]): boolean =>
    pattern.every(index => checkedItemIndexs.includes(index))

  const win = WIN_PATTERNS.some(pattern => isPatternMarkedInBoard(pattern))
  console.log(win)
  return win
}
