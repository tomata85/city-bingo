import { Alert, AlertTitle, Box, Button } from '@mui/material'
import React, { type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

export interface InformationBoxProps {
  text: string
  onClose?: () => void
  showCloseButton?: boolean
  title?: string
}

export default function InformationBox (
  props: InformationBoxProps
): ReactElement {
  const { text, title, onClose, showCloseButton = true } = props
  const { t } = useTranslation()

  return (
    <Box>
      <Alert severity="info">
        {title != null && <AlertTitle>{title}</AlertTitle>}
        {text}
        {showCloseButton && (
          <Box display="flex" justifyContent="flex-end">
            <Button color="inherit" size="small" onClick={onClose}>
            {t('how_to_play_button')}
            </Button>
          </Box>
        )}
      </Alert>
    </Box>
  )
}
