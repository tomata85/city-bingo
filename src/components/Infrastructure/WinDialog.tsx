import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ImageList,
  ImageListItem,
  ImageListItemBar
} from '@mui/material'
import React, { type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { BoardInstanceType } from '../../types'
import { getWinningItems } from '../../logic/board'

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
      <DialogTitle>Awesome winner</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Yay you win! You can continue playing.
        </DialogContentText>
        <WinImageList board={board}/>
      </DialogContent>
      <DialogActions sx={{ p: '20px' }}>
        <Button variant="contained" size="small" onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function WinImageList (props: { board: BoardInstanceType }): ReactElement {
  const { board } = props
  const winningItems = getWinningItems(board)
  const { t } = useTranslation()

  return (
    <ImageList cols={2} gap={4}>
  {winningItems.map((item) => (
    <ImageListItem sx={{ width: '120px' }} key={item.imageUrl}>
      {item.imageUrl != null &&
      <img
        srcSet={`${item.imageUrl}?w=70&auto=format&dpr=2 2x`}
        src={`${item.imageUrl}?w=70&auto=format`}
        alt={t(item.id)}
        loading="lazy"
      />}
      <ImageListItemBar position="below" title={t(item.id)} />
    </ImageListItem>
  ))}
</ImageList>
  )
}
