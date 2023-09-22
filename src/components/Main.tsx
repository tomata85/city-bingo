import React, { type ReactElement, useState } from 'react'
import BoardPage from './board/BoardPage'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Link,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme
} from '@mui/material'
import { BINGO_SIZE, User } from '../types'
import LoginPage from './LoginPage'
import FaceIcon from '@mui/icons-material/Face'
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import './styles.css'
import { MenuPage } from './bottom-drawer/MenuPage'
import { useTranslation } from 'react-i18next'
import { presentableName } from '../logic/personal-details'
import { COLOR_BLACKISH, COLOR_HAPPY_YELLOW } from '../App'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

const enum DisplayedPages {
  Game,
  AboutUs,
  Feedback,
}

export default function Main (): ReactElement {
  const APP_MARGIN = BINGO_SIZE < 5 ? '56px 20px 130px' : '75px 15px 130px'
  const NAV_BAR_THEME = createTheme({
    palette: {
      primary: { main: COLOR_HAPPY_YELLOW },
      secondary: { main: COLOR_BLACKISH }
    }
  })

  const [user, setUser] = useState<User>()
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0)
  const { t } = useTranslation()

  const onLogin = (user: User) => {
    setUser(user)
    setCurrentPageIndex(DisplayedPages.Game)
  }

  const selectedPage = () => {
    switch (currentPageIndex) {
      case DisplayedPages.Game:
        if (user != null) {
          return <BoardPage user={user} destinationId="Bansko" />
        }
        return <LoginPage onLogin={onLogin} />
      case DisplayedPages.AboutUs:
        return <MenuPage key="about" pageName="about" />
      case DisplayedPages.Feedback:
        return <MenuPage key="feedback" pageName="feedback" />
    }
    return <></>
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={NAV_BAR_THEME}>
          <AppBar component="nav" position="fixed">
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
              {user != null && (
                <Button color="secondary" startIcon={<FaceIcon />} size="large">
                  {presentableName(user.name)}
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
      <Box sx={{ margin: APP_MARGIN }}>{selectedPage()}</Box>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <ThemeProvider theme={NAV_BAR_THEME}>
          <BottomNavigation value={currentPageIndex}>
            <BottomNavigationAction
              onClick={() => {
                setCurrentPageIndex(DisplayedPages.Game)
              }}
              icon={<HomeOutlinedIcon />}
              label={t('menu_page_home')}
            />
            <BottomNavigationAction
              onClick={() => {
                setCurrentPageIndex(DisplayedPages.AboutUs)
              }}
              label={t('menu_page_about')}
              icon={<InfoOutlinedIcon />}
            />
            <BottomNavigationAction
              onClick={() => {
                setCurrentPageIndex(DisplayedPages.Feedback)
              }}
              label={t('menu_page_feedback')}
              icon={<TextsmsOutlinedIcon />}
            />
          </BottomNavigation>
        </ThemeProvider>
      </Paper>
    </>
  )
}
