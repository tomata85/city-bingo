import { BoardInstanceType } from '../types'

export function getBoardFromStorage (): BoardInstanceType | undefined {
  const board = localStorage.getItem('board')

  if (board === '{}' || board === null) {
    return undefined
  } return JSON.parse(board)
}

export function storeBoard (board: BoardInstanceType): void {
  localStorage.setItem('board', JSON.stringify(board))
}

export function storeItemImage (itemId: string, imageUrl: string): void {
  localStorage.setItem(`imageData_${itemId}`, imageUrl)
}

export function getItemImageFromStorage (itemId: string): string | null {
  return localStorage.getItem(`imageData_${itemId}`)
}
