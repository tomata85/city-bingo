import React, { type ReactElement, useState, useEffect } from 'react'
import BoardItem from './BoardItem'
import '../styles.css'
import { getBoardFromStorage, storeBoard } from '../../logic/local-storage'
import {
  getInitialUserBoard as getInitialBoardInstance,
  isBoardWin
} from '../../logic/board'
import { BoardInstanceItemType, BoardInstanceType } from '../../types'
import { updateBoardInstance } from '../../logic/api'
import { useTranslation } from 'react-i18next'
import ItemPagesContainer from '../ItemPages/ItemPagesContainer'

export default function Board (props: {
  userId: string
  destinationId: string
}): ReactElement {
  const { t } = useTranslation()

  const getBoardInstance = (): BoardInstanceType =>
    getBoardFromStorage() ?? getInitialBoardInstance(props)

  const [selectedItem, setSelectedItem] =
    useState<BoardInstanceItemType | null>(null)
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

  const onItemPagesClosed = (done: boolean): void => {
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
        <ItemPagesContainer item={selectedItem} onClose={onItemPagesClosed} />
          )
        : (
        <>
          <h1 className="title">{t('main_title')}</h1>
          <div className="board-container">
            {Object.values(board).map((item) => (
              <BoardItem key={item.id} item={item} onClick={onClickItem} />
            ))}
            <div>{isWin ? 'Yay you win!' : ''}</div>
          </div>
        </>
          )}
    </>
  )
}
