import { Alert, AlertTitle, Box, Button } from '@mui/material'
import React, { type ReactElement, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function InstructionsBox (props: { onClose: () => void }): ReactElement {
  const { t } = useTranslation()
  const [howToPlay, setHowToPlay] = useState<string>('')

  useEffect(() => {
    const initalize = async () => {
      const res = await import('../../i18n/descriptions/en/how_to_play.md')
      const res2 = await fetch(res.default)
      const howToPlay = await res2.text()
      setHowToPlay(howToPlay)
    }

    void initalize()
  }, [])

  return (
    <Box sx={{ mt: '20px' }}>
    <Alert severity="info">
      <AlertTitle>{t('how_to_play_title')}</AlertTitle>
      {howToPlay}
      <Box display="flex" justifyContent="flex-end">
      <Button color="inherit" size="small" onClick={props.onClose}>
          {t('how_to_play_button')}
      </Button>
      </Box>
    </Alert>
  </Box>
  )
}
