import React, { type ReactElement, useState, useEffect, useMemo } from 'react'
import '../styles.css'
import {
  getShowInstructionsStorage,
  storeShowInstructions
} from '../../io/local-storage'
import { initializeBoard, updateBoard } from '../../logic/board'
import { BoardInstanceItemType, BoardInstanceType, User } from '../../types'
import { updateBoardInstanceInDB } from '../../io/aws-lambdas'
import { useTranslation } from 'react-i18next'
import ItemPagesContainer from '../ItemPages/ItemPagesContainer'
import InstructionsBox from './InstructionsBox'
import Board from './Board'
import { Typography } from '@mui/material'
import { getItemDescriptions } from '../../io/description-files'

export default function BoardPage (props: {
  user: User
  destinationId: string
}): ReactElement {
  const { t, i18n } = useTranslation()
  const { user, destinationId } = props
  const boardItemDescriptions = useMemo(() => {
    return getItemDescriptions(i18n.language)
  }, [])
  const [showInstructions, setShowInstructions] = useState<boolean>(
    getShowInstructionsStorage(user.id)
  )
  const [selectedItem, setSelectedItem] =
    useState<BoardInstanceItemType | null>(null)
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
        <ItemPagesContainer
          item={selectedItem}
          description={boardItemDescriptions[selectedItem.id]}
          onClose={onItemPagesClosed}
        />
          )
        : (
        <>
          <Typography sx={{ mt: '15px', mb: '5px' }} variant="h3">
            {t('main_title')}
          </Typography>
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