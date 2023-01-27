import { UserBoardType } from '../types'

export function getBoardFromStorage (): UserBoardType | undefined {
  const board = localStorage.getItem('board')

  if (board === '{}' || board === null) {
    return undefined
  } return JSON.parse(board)
}

export function storeBoard (board: UserBoardType): void {
  localStorage.setItem('board', JSON.stringify(board))
}
