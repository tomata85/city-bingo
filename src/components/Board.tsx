import React, { type ReactElement, useState, useEffect } from 'react'
import BoardItem from '../components/BoardItem'
import './styles.css'
import { getBoardFromStorage, storeBoard } from '../logic/local-storage'
import { getInitialUserBoard as getInitialBoardInstance, isBoardWin } from '../logic/board'
import { BoardInstanceItemType, BoardInstanceType } from '../types'
import DidItPage from './DidItPage'
import { updateBoardInstance } from '../logic/api'

export default function Board (props: {
  userId: string
  destinationId: string
}): ReactElement {
  const getBoardInstance = (): BoardInstanceType =>
    getBoardFromStorage() ?? getInitialBoardInstance(props)

  const [selectedItem, setSelectedItem] = useState<BoardInstanceItemType | null>(null)
  const [board, setBoard] = useState<BoardInstanceType>(getBoardInstance())
  const [isWin, setIsWin] = useState<boolean>(false)

  useEffect(() => {
    storeBoard(board)
    setIsWin(isBoardWin(board))
    updateBoardInstance(board)
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
