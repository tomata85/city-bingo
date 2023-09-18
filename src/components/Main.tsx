import React, { type ReactElement, useState, useEffect } from 'react'
import BoardPage from './board/BoardPage'
import Button from '@mui/material/Button'
// TODO: bring back translation
// import TranslateIcon from '@mui/icons-material/Translate'
import { useTranslation } from 'react-i18next'
import AppBar from '@mui/material/AppBar'
import { Box, Link, Toolbar, Typography } from '@mui/material'
import { BINGO_SIZE, User } from '../types'
import LoginPage from './LoginPage'
import AccountCircle from '@mui/icons-material/AccountCircle'
import './styles.css'
import SwipeableEdgeDrawer from './infrastructure/SwipeableDrawer'
import { SupportUsContainer } from './bottom-drawer/SupportUsContainer'
import { t } from 'i18next'

export default function Main (): ReactElement {
  const APP_MARGIN = BINGO_SIZE < 5 ? 'auto 30px' : 'auto 15px'
  const { i18n } = useTranslation()
  const [lang, setLang] = useState<string>(i18n.language)
  const [user, setUser] = useState<User>()
  const [showHelp, setShowHelp] = useState<boolean>(false)

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

  const onShowHelp = () => {
    setShowHelp(true)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar component="nav" position="static">
          <Toolbar>
            <Link href="#" underline="none">
              <img src="city-bingo-logo.png" width="35" height="35" />
            </Link>
            <Typography
              variant="h6"
              component="div"
              textAlign="left"
              sx={{ pl: '10px', flexGrow: 1 }}
            >
              City Bingo
            </Typography>
            {/* <Button
              color="inherit"
              onClick={onChangeLanguage}
              startIcon={<TranslateIcon />}
            >
              {lang}
            </Button> */}
            {user != null && (
              <Button
                color="inherit"
                startIcon={<AccountCircle />}
                size="large"
              >
                {user.name}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ margin: APP_MARGIN, mb: '60px' }}>
        {user === undefined
          ? (
          <LoginPage onLogin={onLogin} />
            )
          : (
          <BoardPage
            user={user}
            destinationId="Bansko"
            onShowHelp={onShowHelp}
          />
            )}
        <SwipeableEdgeDrawer
          title={t('drawer_title')}
          open={showHelp}
          onClose={() => {
            setShowHelp(false)
          }}
        >
          <SupportUsContainer />
        </SwipeableEdgeDrawer>
      </Box>
    </>
  )
}
