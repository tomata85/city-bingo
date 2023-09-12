import React, { type ReactElement, useState, useEffect } from 'react'
import '../styles.css'
import {
  getShowInstructionsStorage,
  storeShowInstructions
} from '../../logic/local-storage'
import {
  initializeBoard,
  updateBoard
} from '../../logic/board'
import { BoardInstanceItemType, BoardInstanceType, User } from '../../types'
import { updateBoardInstanceInDB } from '../../logic/api'
import { useTranslation } from 'react-i18next'
import ItemPagesContainer from '../ItemPages/ItemPagesContainer'
import InstructionsBox from './InstructionsBox'
import Board from './Board'

export default function BoardPage (props: {
  user: User
  destinationId: string
}): ReactElement {
  const { t } = useTranslation()
  const { user, destinationId } = props
  const [selectedItem, setSelectedItem] =
    useState<BoardInstanceItemType | null>(null)
  const [showInstructions, setShowInstructions] = useState<boolean>(
    getShowInstructionsStorage(user.id)
  )
  // TODO: is this initilazation a gross hack?
  const [board, setBoard] = useState<BoardInstanceType>({})

  useEffect(() => {
    const initialize = async () => {
      const board = await initializeBoard(user.id, destinationId)
      setBoard(board)
    }

    void initialize()
  }, [])

  useEffect(() => {
    storeShowInstructions(user.id, showInstructions)
  }, [showInstructions])

  const onClickItem = (item: BoardInstanceItemType): void => {
    setSelectedItem(item)
  }

  const onItemPagesClosed = (updatedItem: BoardInstanceItemType): void => {
    const updatedBoard = updateBoard(board, updatedItem)
    setBoard(updatedBoard)
    void updateBoardInstanceInDB(user.id, updatedBoard)

    setSelectedItem(null)

    if (showInstructions) {
      setShowInstructions(false)
    }
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
          <Board user={user} board={board} onClickItem={onClickItem} />
          {showInstructions && (
            <InstructionsBox
              onClose={() => {
                setShowInstructions(false)
              }}
            />
          )}
        </>
          )}
    </>
  )
}
