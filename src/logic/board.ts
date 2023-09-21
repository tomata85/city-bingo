import {
  BANSKO_BOARD_ITEMS, BINGO_SIZE, BoardInstanceItemType, BoardInstanceType, WIN_PATTERNS
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
      checked: false,
      isWin: false
    }
  })

  return board
}

export function getWinningIndexes (board: BoardInstanceType): number[] {
  const checkedItemIndexs = Object.values(board)
    .filter((item) => item.checked)
    .map((item) => item.orderIndex)

  const isPatternMarkedInBoard = (pattern: number[]): boolean =>
    pattern.every(index => checkedItemIndexs.includes(index))

  const winningPatterns = WIN_PATTERNS[BINGO_SIZE]
    .filter(pattern => isPatternMarkedInBoard(pattern))
    .flat(1)
  return winningPatterns
}

export function updateBoard (
  board: BoardInstanceType, items: BoardInstanceItemType[]): BoardInstanceType {
  const itemMap = items.reduce<Record<string, BoardInstanceItemType>>((map, item) => {
    map[item.id] = item
    return map
  }, {})

  const updatedBoard = {
    ...board,
    ...itemMap
  }
  return updatedBoard
}

export function updateBoardItem (
  item: BoardInstanceItemType,
  updatedProps: Partial<BoardInstanceItemType>): BoardInstanceItemType {
  return {
    ...item,
    ...updatedProps
  }
}

// TODO: this seems hacky
export function getItemsByOrderIndex (
  board: BoardInstanceType, indexes: number[]): BoardInstanceItemType[] {
  const results = Object.values(board).filter(item => indexes.includes(item.orderIndex))
  return results
}
