import {
  BANSKO_BOARD_ITEMS, BoardInstanceItemType, BoardInstanceType, WIN_PATTERNS
} from '../types'
import { getBoardFromDB } from '../io/aws-lambdas'
import { getBoardFromStorage } from '../io/local-storage'

export async function initializeBoard (
  userId: string, destinationId: string): Promise<BoardInstanceType> {
  return getBoardFromStorage(userId) ??
    (await getBoardFromDB(userId)) ??
    generateNewBoardInstance(userId, destinationId)
}

function generateNewBoardInstance (userId: string, destinationId: string): BoardInstanceType {
  const board: BoardInstanceType = {}
  BANSKO_BOARD_ITEMS.forEach((item, index) => {
    board[item] = {
      orderIndex: index,
      id: item,
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

export function updateBoard (
  board: BoardInstanceType, item: BoardInstanceItemType): BoardInstanceType {
  return {
    ...board,
    [item.id]: item
  }
}

export function updateBoardItem (
  item: BoardInstanceItemType,
  updatedProps: Partial<BoardInstanceItemType>): BoardInstanceItemType {
  return {
    ...item,
    ...updatedProps
  }
}
