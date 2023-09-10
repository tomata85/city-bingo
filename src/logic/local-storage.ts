import { BoardInstanceType, User } from '../types'

export function getBoardFromStorage (): BoardInstanceType | undefined {
  const board = localStorage.getItem('board')

  if (board === '{}' || board === null) {
    return undefined
  } return JSON.parse(board)
}

export function storeBoard (userId: string, board: BoardInstanceType): void {
  localStorage.setItem(`city_bingo_${userId}`, JSON.stringify(board))
}

export function storeLoggedInUser (user: User): void {
  localStorage.setItem('city_bingo_user', JSON.stringify(user))
}

export function getLoggedInUserFromStorage (): User | undefined {
  const user = localStorage.getItem('city_bingo_user')

  if (user === null) {
    return undefined
  } else {
    return JSON.parse(user)
  }
}
