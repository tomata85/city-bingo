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
  const getUserBoard = (): UserBoardType =>
    getBoardFromStorage() ?? getInitialUserBoard(props)

  const [selectedItem, setSelectedItem] = useState<BoardItemType | null>(null)
  const [board, setBoard] = useState<UserBoardType>(getUserBoard())
  const [isWin, setIsWin] = useState<boolean>(false)

  useEffect(() => {
    storeBoard(board)
    setIsWin(isBoardWin(board))
  }, [board])

  const onClickItem = (itemId: string): void => {
    setSelectedItem(board[itemId])
  }

  const onCloseDidItPage = (done: boolean): void => {
    if (selectedItem != null && done) {
      setBoard({
        ...board,
        [selectedItem.id]: {
          ...board[selectedItem.id],
          checked: !board[selectedItem.id].checked
        }
      })
    }

    setSelectedItem(null)
  }

  return (
    <>
      {selectedItem != null
        ? (
        <DidItPage item={selectedItem} onClose={onCloseDidItPage} />
          )
        : (
        <>
          <header>Welcome back Yulia</header>
          <h1 className="title">Bansko Bingo</h1>
          <div className="board-container">
            {Object.values(board).map((item) => (
              <BoardItem key={item.id} item={item} onClick={onClickItem}/>
            ))}
            <div>{isWin ? 'Yay you win!' : ''}</div>
          </div>
        </>
          )}
    </>
  )
}
