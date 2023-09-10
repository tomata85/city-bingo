import React, { type ReactElement, useState, useEffect } from 'react'
import BoardItem from './BoardItem'
import '../styles.css'
import { getBoardFromStorage, storeBoard } from '../../logic/local-storage'
import { generateBoardInstance, isBoardWin } from '../../logic/board'
import { BoardInstanceItemType, BoardInstanceType, User } from '../../types'
import { getBoardFromDB, updateBoardInstance } from '../../logic/api'
import { useTranslation } from 'react-i18next'
import ItemPagesContainer from '../ItemPages/ItemPagesContainer'

export default function Board (props: {
  user: User
  destinationId: string
}): ReactElement {
  const { t } = useTranslation()
  const [selectedItem, setSelectedItem] =
    useState<BoardInstanceItemType | null>(null)
  // TODO: is this initilazation a gross hack?
  const [board, setBoard] = useState<BoardInstanceType>({})
  const [isWin, setIsWin] = useState<boolean>(false)
  const { user, destinationId } = props

  useEffect(() => {
    const initialize = async () => {
      const board =
        getBoardFromStorage() ??
        (await getBoardFromDB()) ??
        generateBoardInstance(user.id, destinationId)
      setBoard(board)
    }

    void initialize()
  }, [])

  useEffect(() => {
    if (Object.keys(board).length > 0) {
      storeBoard(user.id, board)
      setIsWin(isBoardWin(board))
    }
  }, [board])

  const onClickItem = (itemId: string): void => {
    setSelectedItem(board[itemId])
  }

  const onItemPagesClosed = (done: boolean, imageUrl?: string): void => {
    if (selectedItem != null && done) {
      const updatedBoard = {
        ...board,
        [selectedItem.id]: {
          ...board[selectedItem.id],
          checked: true,
          imageUrl
        }
      }

      setBoard(updatedBoard)
      updateBoardInstance(updatedBoard)
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
