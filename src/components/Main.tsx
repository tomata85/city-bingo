import React, { type ReactElement, useState, useEffect } from 'react'
import Board from './Board/Board'
import Button from '@mui/material/Button'
import TranslateIcon from '@mui/icons-material/Translate'
import { useTranslation } from 'react-i18next'
import AppBar from '@mui/material/AppBar'
import { LocationCity } from '@mui/icons-material'
import { Box, IconButton, Toolbar, Typography } from '@mui/material'

export default function Main (): ReactElement {
  const { t, i18n } = useTranslation()
  const [lang, setLang] = useState<string>(i18n.language)

  useEffect(() => {
    i18n.changeLanguage(lang).catch((e) => {
      console.log(e)
    })
  }, [lang])

  const onChangeLanguage = (): void => {
    const updatedLang = lang === 'en' ? 'he' : 'en'
    setLang(updatedLang)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <LocationCity/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              City Bingo
            </Typography>
            <Button
              color="inherit"
              startIcon={<TranslateIcon />}
              onClick={onChangeLanguage}
            >
              {lang}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Board userId="Oren Chazan" destinationId="Bansko" />
    </>
  )
}
