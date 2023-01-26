import React, { type ReactElement, useState, useEffect } from 'react'
import BoardItem from '../components/BoardItem'
import './styles.css'
import { getInitialUserBoard, getBoardFromStorage, storeBoard } from '../utils'
import { toggleCheckItem } from '../api'
import { UserBoardType } from '../types'

export default function Board (props: {
  userId: string
  destinationId: string
}): ReactElement {
  const getLatestBoard = (): UserBoardType => (
    getBoardFromStorage() ?? getInitialUserBoard(props)
  )

  const [board, setBoard] = useState<UserBoardType>(getLatestBoard())

  useEffect(() => {
    storeBoard(board)
  }, [board])

  const onClickItem = (itemId: string): void => {
    setBoard({
      ...board,
      [itemId]: { ...board[itemId], checked: !board[itemId].checked }
    })
    toggleCheckItem(itemId)
  }

  return (
    <div className="board-container">
      {Object.values(board).map((item) => (
        <BoardItem key={item.id} item={item} onClick={onClickItem} />
      ))}
    </div>
  )
}
