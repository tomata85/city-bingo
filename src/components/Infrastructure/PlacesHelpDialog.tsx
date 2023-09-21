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
  onClose: () => void
}

export default function PlacesHelpDialog (props: InformationBoxProps): ReactElement {
  const { open, onClose } = props
  const { t } = useTranslation()

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{t('info_places_title')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {t('info_click_place')}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: '15px' }}>
        <Button variant="contained" size="small" onClick={onClose} autoFocus>
          {t('help_button')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
