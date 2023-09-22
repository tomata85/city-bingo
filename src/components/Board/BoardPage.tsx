import React, { type ReactElement, useState, useEffect, useMemo } from 'react'
import '../styles.css'
import {
  EMPTY_BOARD,
  getDoneItems,
  initializeBoard,
  updateBoard,
  updateBoardWins
} from '../../logic/board'
import { BoardInstanceItemType, BoardInstanceType, User } from '../../types'
import { updateBoardInstanceInDB } from '../../io/aws-lambdas'
import { useTranslation } from 'react-i18next'
import ItemPagesContainer from '../item-pages/ItemPagesContainer'
import Board from './Board'
import { Box, Button, List, Stack, Typography } from '@mui/material'
import {
  getMarkdownText,
  getItemDescriptions
} from '../../io/description-files'
import Loading from '../infrastructure/Loading'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import HelpDialog from '../infrastructure/HelpDialog'
import WinDialog from '../infrastructure/WinDialog'
import DoneItemCard from '../item-pages/DoneItemCard'

export default function BoardPage (props: {
  user: User
  destinationId: string
}): ReactElement {
  const TITLE_STYLE = {
    mt: '70px',
    mb: '10px',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
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
  const [board, setBoard] = useState<BoardInstanceType>(EMPTY_BOARD)
  const [help, setHelp] = useState<string>('')
  const [showWinDialog, setShowWinDialog] = useState(false)

  useEffect(() => {
    const initialize = async () => {
      const board = await initializeBoard(user.id, destinationId)
      const howToPlay = await getMarkdownText('how-to-play', i18n.language)
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
    const formerIsWin = board.isWin
    let updatedBoard = updateBoard(board, [updatedItem])
    updatedBoard = updateBoardWins(updatedBoard)

    if (!formerIsWin && updatedBoard.isWin) {
      setShowWinDialog(true)
    }

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
          <Box id="board-page-title" display="flex" sx={TITLE_STYLE}>
            <Box>
              <Typography display="inline" variant="h4">
                {t('main_title')}
              </Typography>
              <Typography
                sx={{ ml: '5px', textTransform: 'uppercase' }}
                display="inline"
                variant="subtitle2"
              >
                {t('main_subtitle')}
              </Typography>
            </Box>
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
              {getDoneItems(board).length > 0 && (
                <>
                  <Typography sx={{ mt: '15px' }} variant="h6">
                    {t('done_items_title')}
                  </Typography>
                  <List
                    overflow={'auto'}
                    component={Stack}
                    direction={'row'}
                    spacing={1}
                    sx={{ mt: '-8px' }}
                  >
                    {getDoneItems(board).map((item) => (
                      <DoneItemCard key={item.id} item={item} />
                    ))}
                  </List>
                </>
              )}
              <HelpDialog helpText={help} open={showHelp} onClose={hideHelp} />
              <WinDialog
                board={board}
                open={showWinDialog}
                onClose={() => {
                  setShowWinDialog(false)
                }}
              />
            </>
              )}
        </>
          )}
    </>
  )
}
