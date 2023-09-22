import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import React, { type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { BoardInstanceType } from '../../types'
import { getDoneItems } from '../../logic/board'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import '../styles.css'
import DoneItemCardForWinDialog from '../item-pages/DoneItemCardForWinDialog'

export interface InformationBoxProps {
  open: boolean
  board: BoardInstanceType
  onClose: () => void
}

export default function WinDialog (props: InformationBoxProps): ReactElement {
  const { open, board, onClose } = props
  const { t } = useTranslation()

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{t('win_dialog_title')}</DialogTitle>
      <DialogContent>
        <DialogContentText variant="body2" id="alert-dialog-description">
          {t('win_dialog_text')}
        </DialogContentText>
        <WinImageList board={board} />
      </DialogContent>
      <DialogActions sx={{ p: '20px' }}>
        <Button variant="contained" onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function WinImageList (props: { board: BoardInstanceType }): ReactElement {
  const { board } = props
  const doneItems = getDoneItems(board)

  return (
    <Carousel
      NextIcon={<ArrowBackIosNewIcon />}
      PrevIcon={<ArrowForwardIosIcon />}
      swipe={true}
      animation={'slide'}
      duration={5}
      sx={{ mt: '15px' }}
    >
      {doneItems.map(
        (item) =>
          item.imageUrl != null && (
            <Box
              key={item.id}
              sx={{ width: '100%' }}
            >
              <DoneItemCardForWinDialog item={item} />
            </Box>
          )
      )}
    </Carousel>
  )
}
