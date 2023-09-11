import React, { type ReactElement, useState, useEffect } from 'react'
import Board from './Board/Board'
import Button from '@mui/material/Button'
import TranslateIcon from '@mui/icons-material/Translate'
import { useTranslation } from 'react-i18next'
import AppBar from '@mui/material/AppBar'
import { Box, Link, Toolbar, Typography } from '@mui/material'
import { User } from '../types'
import LoginPage from './LoginPage'

export default function Main (): ReactElement {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState<string>(i18n.language)
  const [user, setUser] = useState<User>()

  useEffect(() => {
    void i18n.changeLanguage(lang)
  }, [lang])

  const onChangeLanguage = (): void => {
    const updatedLang = lang === 'en' ? 'he' : 'en'
    setLang(updatedLang)
  }

  const onLogin = (user: User) => {
    setUser(user)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
              <Link
                href="#"
                underline="none"
              >
                <img
                  src="city-bingo-logo.png"
                  width="35"
                  height="35"
                />
              </Link>
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
      {user === undefined
        ? (
        <LoginPage onLogin={onLogin} />
          )
        : (
        <Board user={user} destinationId="Bansko" />
          )}
    </>
  )
}
