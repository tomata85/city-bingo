import React, { type ReactElement, useState, useEffect } from 'react'
import BoardItem from '../components/BoardItem'
import './styles.css'
import { getBoardFromStorage, storeBoard } from '../logic/local-storage'
import { getInitialUserBoard, isBoardWin } from '../logic/board'
import { BoardItemType, UserBoardType } from '../types'
import DidItPage from './DidItPage'

export default function Board (props: {
  userId: string
  destinationId: string
}): ReactElement {
  const getUserBoard = (): UserBoardType => (
    getBoardFromStorage() ?? getInitialUserBoard(props)
  )

  const [selectedItem, setSelectedItem] = useState<BoardItemType | null>(null)
  const [board, setBoard] = useState<UserBoardType>(getUserBoard())
  const [isWin, setIsWin] = useState<boolean>(false)

  useEffect(() => {
    storeBoard(board)
    setIsWin(isBoardWin(board))
  }, [board])

  const onClickItem = (itemId: string): void => {
    // setBoard({
    //   ...board,
    //   [itemId]: { ...board[itemId], checked: !board[itemId].checked }
    // })
    setSelectedItem(board[itemId])
  }

  return (
    <>
      { (selectedItem != null)
        ? <DidItPage/>
        : <div className="board-container">
          {Object.values(board).map((item) => (
            <BoardItem key={item.id} item={item} onClick={onClickItem} />
          ))}
          <div>{ isWin ? 'Yay you win!' : ''}</div>
        </div> }
    </>
  )
}
