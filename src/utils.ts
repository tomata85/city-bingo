import { BANSKO_BOARD_ITEMS, type UserBoardType } from './types'

export function getInitialUserBoard (_: { userId: string, destinationId: string }): UserBoardType {
  const board: UserBoardType = {}
  Object.entries(BANSKO_BOARD_ITEMS).forEach((item) => {
    board[item[0]] = {
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
