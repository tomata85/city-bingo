import React, { type ReactElement, useState, useEffect } from 'react'
import BoardItem from '../components/BoardItem'
import './styles.css'
import { getInitialUserBoard, getBoardFromStorage, storeBoard, isBoardWin } from '../utils'
import { UserBoardType } from '../types'

export default function Board (props: {
  userId: string
  destinationId: string
}): ReactElement {
  const getUserBoard = (): UserBoardType => (
    getBoardFromStorage() ?? getInitialUserBoard(props)
  )

  const [board, setBoard] = useState<UserBoardType>(getUserBoard())
  const [isWin, setIsWin] = useState<boolean>(false)

  useEffect(() => {
    storeBoard(board)
    setIsWin(isBoardWin(board))
  }, [board])

  const onClickItem = (itemId: string): void => {
    setBoard({
      ...board,
      [itemId]: { ...board[itemId], checked: !board[itemId].checked }
    })
  }

  return (
    <div className="board-container">
      {Object.values(board).map((item) => (
        <BoardItem key={item.id} item={item} onClick={onClickItem} />
      ))}
      <div>{ isWin ? 'Yay you win!' : ''}</div>
    </div>
  )
}
