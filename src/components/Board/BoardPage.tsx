import React, { type ReactElement, useState, useEffect, useMemo } from 'react'
import '../styles.css'
import {
  initializeBoard,
  updateBoard,
  updateBoardWins
} from '../../logic/board'
import { BoardInstanceItemType, BoardInstanceType, User } from '../../types'
import { updateBoardInstanceInDB } from '../../io/aws-lambdas'
import { useTranslation } from 'react-i18next'
import ItemPagesContainer from '../item-pages/ItemPagesContainer'
import Board from './Board'
import { Box, Button, Typography } from '@mui/material'
import {
  getHowToPlayInstructions,
  getItemDescriptions
} from '../../io/description-files'
import Loading from '../infrastructure/Loading'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import HelpDialog from '../infrastructure/HelpDialog'

export default function BoardPage (props: {
  user: User
  destinationId: string
}): ReactElement {
  const TITLE_STYLE = {
    mt: '100px',
    mb: '10px',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }

  const { t, i18n } = useTranslation()
  const { user, destinationId } = props
  const [loading, setLoading] = useState(true)
  const boardItemDescriptions = useMemo(() => {
    return getItemDescriptions(i18n.language)
  }, [])
  const [showHelp, setShowHelp] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] =
    useState<BoardInstanceItemType | null>(null)

  const [board, setBoard] = useState<BoardInstanceType>({})
  const [help, setHelp] = useState<string>('')

  useEffect(() => {
    const initialize = async () => {
      const board = await initializeBoard(user.id, destinationId)
      const howToPlay = await getHowToPlayInstructions(i18n.language)
      setHelp(howToPlay)
      setBoard(board)

      setLoading(false)
    }

    void initialize()
  }, [])

  const hideHelp = () => {
    setShowHelp(false)
  }

  const onClickItem = (item: BoardInstanceItemType): void => {
    setSelectedItem(item)
  }

  const onItemPagesClosed = (updatedItem: BoardInstanceItemType): void => {
    let updatedBoard = updateBoard(board, [updatedItem])
    updatedBoard = updateBoardWins(updatedBoard)
    setBoard(updatedBoard)
    void updateBoardInstanceInDB(user.id, updatedBoard)

    setSelectedItem(null)
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
          <Box display="flex" sx={TITLE_STYLE}>
            <Typography display="inline" variant="h3">
              {t('main_title')}
            </Typography>
            <Button
              color="secondary"
              onClick={() => {
                setShowHelp(true)
              }}
            >
              <HelpOutlineIcon fontSize="large" />
            </Button>
          </Box>
          {loading
            ? (
            <Loading />
              )
            : (
            <>
              <Board user={user} board={board} onClickItem={onClickItem} />
              <HelpDialog helpText={help} open={showHelp} onClose={hideHelp} />
            </>
              )}
        </>
          )}
    </>
  )
}
