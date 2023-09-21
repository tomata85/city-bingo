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

export const EMPTY_BOARD = {
  isWin: false,
  items: {}
}

function generateNewBoardInstance (userId: string, destinationId: string): BoardInstanceType {
  const board: BoardInstanceType = EMPTY_BOARD

  BANSKO_BOARD_ITEMS.forEach((item, index) => {
    board.items[item] = {
      orderIndex: index,
      id: item,
      checked: false,
      isWin: false
    }
  })

  return board
}

export function updateBoardWins (board: BoardInstanceType): BoardInstanceType {
  let updatedBoard = board
  const winningIndexes = getWinningIndexes(updatedBoard)
  if (winningIndexes.length > 0) {
    const winningItems = getItemsByOrderIndex(updatedBoard, winningIndexes).map(
      (item) => updateBoardItem(item, { isWin: true })
    )
    updatedBoard.isWin = true
    updatedBoard = updateBoard(updatedBoard, winningItems)
  }
  return updatedBoard
}

export function updateBoard (
  board: BoardInstanceType, items: BoardInstanceItemType[]): BoardInstanceType {
  const itemMap = items.reduce<Record<string, BoardInstanceItemType>>((map, item) => {
    map[item.id] = item
    return map
  }, {})

  const updatedBoard = board
  updatedBoard.items = {
    ...updatedBoard.items,
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

export function getWinningItems (board: BoardInstanceType): BoardInstanceItemType[] {
  return Object.values(board.items).filter(item => item.isWin)
}

export function getDoneItems (board: BoardInstanceType): BoardInstanceItemType[] {
  return Object.values(board.items).filter(item => item.checked)
}

// TODO: this seems hacky
function getItemsByOrderIndex (
  board: BoardInstanceType, indexes: number[]): BoardInstanceItemType[] {
  const results = Object.values(board.items).filter(item => indexes.includes(item.orderIndex))
  return results
}

function getWinningIndexes (board: BoardInstanceType): number[] {
  const checkedItemIndexs = Object.values(board.items)
    .filter((item) => item.checked)
    .map((item) => item.orderIndex)

  const isPatternMarkedInBoard = (pattern: number[]): boolean =>
    pattern.every(index => checkedItemIndexs.includes(index))

  const winningPatterns = WIN_PATTERNS[BINGO_SIZE]
    .filter(pattern => isPatternMarkedInBoard(pattern))
    .flat(1)
  return winningPatterns
}
