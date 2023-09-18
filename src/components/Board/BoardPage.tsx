import React, { type ReactElement, useState, useEffect, useMemo } from 'react'
import '../styles.css'
import { initializeBoard, updateBoard } from '../../logic/board'
import { BoardInstanceItemType, BoardInstanceType, User } from '../../types'
import { updateBoardInstanceInDB } from '../../io/aws-lambdas'
import { useTranslation } from 'react-i18next'
import ItemPagesContainer from '../item-pages/ItemPagesContainer'
import Board from './Board'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material'
import {
  getHowToPlayInstructions,
  getItemDescriptions
} from '../../io/description-files'
import Loading from '../infrastructure/Loading'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

export default function BoardPage (props: {
  user: User
  destinationId: string
}): ReactElement {
  const { t, i18n } = useTranslation()
  const { user, destinationId } = props
  const [loading, setLoading] = useState(true)
  const boardItemDescriptions = useMemo(() => {
    return getItemDescriptions(i18n.language)
  }, [])
  const [showHelp, setShowHelp] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] =
    useState<BoardInstanceItemType | null>(null)
  // TODO: is this initilazation a gross hack?
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
    const updatedBoard = updateBoard(board, updatedItem)
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
          <Box
            display="flex"
            sx={{ mt: '30px', mb: '15px', justifyContent: 'space-between' }}
          >
            <Typography display="inline" variant="h3">
              {t('main_title')}
            </Typography>
            <Button
              color="secondary"
              onClick={() => {
                setShowHelp(true)
              }}
            >
              <HelpOutlineIcon />
            </Button>
          </Box>
          {/* <img className="cover-image" src="bansko-title.jpg"/> */}
          {loading
            ? (
            <Loading />
              )
            : (
            <>
              <Board user={user} board={board} onClickItem={onClickItem} />
              <Dialog
                open={showHelp}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle>{t('how_to_play_title')}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {help}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={hideHelp}
                    autoFocus
                  >
                    {t('how_to_play_button')}
                  </Button>
                </DialogActions>
              </Dialog>
            </>
              )}
        </>
          )}
    </>
  )
}
