import React, { type ReactElement, useState, useEffect } from 'react'
import BoardPage from './board/BoardPage'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Link,
  Paper,
  Toolbar,
  Typography
} from '@mui/material'
import { BINGO_SIZE, User } from '../types'
import LoginPage from './LoginPage'
import FaceIcon from '@mui/icons-material/Face'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import './styles.css'
import { AboutUsPage } from './bottom-drawer/AboutUsPage'
import { useTranslation } from 'react-i18next'
import { presentableName } from '../logic/personal-details'

const enum DisplayedPages {
  Game,
  AboutUs,
  Feedback,
}

export default function Main (): ReactElement {
  const APP_MARGIN = BINGO_SIZE < 5 ? '75px 30px 75px' : '75px 15px 75px'
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
        return <AboutUsPage />
    }
    return <></>
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
      </Box>
      <Box sx={{ margin: APP_MARGIN }}>{selectedPage()}</Box>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation value={currentPageIndex}>
          <BottomNavigationAction
            onClick={() => {
              setCurrentPageIndex(DisplayedPages.Game)
            }}
            icon={<HomeOutlinedIcon />}
            label={t('bottom_nav_home')}
          />
          <BottomNavigationAction
            onClick={() => {
              setCurrentPageIndex(DisplayedPages.AboutUs)
            }}
            label={t('bottom_nav_about')}
            icon={<LocalCafeOutlinedIcon />}
          />
          <BottomNavigationAction
            label={t('bottom_nav_feedback')}
            icon={<ChatBubbleOutlineIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  )
}
