import { BoardInstanceType, User } from '../types'

export function getBoardFromStorage (userId: string): BoardInstanceType | undefined {
  const board = localStorage.getItem(`city_bingo_${userId}`)

  if (board === '{}' || board === null) {
    return undefined
  } return JSON.parse(board)
}

export function storeBoard (userId: string, board: BoardInstanceType): void {
  localStorage.setItem(`city_bingo_${userId}_board`, JSON.stringify(board))
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

export function storeShowInstructions (userId: string, showInstructions: boolean): void {
  localStorage.setItem(`city_bingo_${userId}_showInstructions`, JSON.stringify(showInstructions))
}

export function getShowInstructionsStorage (userId: string): boolean {
  const showInstructions = localStorage.getItem(`city_bingo_${userId}_showInstructions`)

  if (showInstructions === null) {
    return true
  } else {
    return JSON.parse(showInstructions)
  }
}
