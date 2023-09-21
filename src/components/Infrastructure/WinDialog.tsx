import {
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
      </DialogContent>
      <DialogActions sx={{ p: '20px' }}>
        <Button variant="contained" size="small" onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
