import { BoardInstanceType, User } from '../types'
import { CURRENT_VERSION, isBreakingChange } from '../logic/semantic-versioning'

export function resetLocalStorageOnBreakingChange () {
  const localStorageVersion = localStorage.getItem('city_bingo_version')
  const shouldReset =
    localStorageVersion === null || isBreakingChange(JSON.parse(localStorageVersion))

  if (shouldReset) {
    localStorage.clear()
    localStorage.setItem('city_bingo_version', JSON.stringify(CURRENT_VERSION))
  }
}

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
