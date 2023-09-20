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

export interface InformationBoxProps {
  open: boolean
  helpText: string
  onClose: () => void
}

export default function HelpDialog (props: InformationBoxProps): ReactElement {
  const { open, helpText, onClose } = props
  const { t } = useTranslation()

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{t('how_to_play_title')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {helpText}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: '20px' }}>
        <Button variant="contained" size="small" onClick={onClose} autoFocus>
          {t('how_to_play_button')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
