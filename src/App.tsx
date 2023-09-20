import React, { useEffect, type ReactElement } from 'react'
import './App.css'
import Main from './components/Main'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { resetLocalStorageOnBreakingChange } from './io/local-storage'
import { BINGO_SIZE } from './types'

export const COLOR_HAPPY_YELLOW = '#FFF300'
export const COLOR_BLACKISH = '#524856'
export const COLOR_WHITE = '#fff'
export const COLOR_TURQUISE = '#A0C7B5'
export const COLOT_REDISH = '#ff6d75'

const headerFont = {
  fontFamily: 'Josefin Sans',
  color: COLOR_BLACKISH
}
const mainHeaderFont = {
  ...headerFont,
  fontWeight: '800'
}
const subtitle1Font = {
  fontSize: 16,
  lineHeight: '1.25em',
  fontFamily: 'Josefin Sans',
  color: COLOR_BLACKISH
}

const defaultFont = {
  fontSize: 16,
  fontWeight: BINGO_SIZE < 5 ? '400' : '800',
  letterSpacing: 1,
  color: COLOR_BLACKISH
}

const boardItemFont = {
  fontSize: 13,
  fontWeight: BINGO_SIZE < 5 ? '400' : '800',
  letterSpacing: 1,
  color: 'black'
}

const buttonFont = {
  fontWeight: 600,
  color: COLOR_BLACKISH,
  palette: {
    secondary: COLOR_BLACKISH
  }
}

const theme = createTheme({
  typography: {
    fontFamily: ['Urbanist', 'sans-serif'].join(','),
    h1: mainHeaderFont,
    h2: mainHeaderFont,
    h3: headerFont,
    h4: headerFont,
    h5: headerFont,
    h6: headerFont,
    subtitle1: subtitle1Font,
    body1: boardItemFont,
    body2: defaultFont,
    button: buttonFont
  },
  palette: {
    primary: { main: COLOR_TURQUISE },
    secondary: { main: COLOR_BLACKISH }
  }
})

function App (): ReactElement {
  useEffect(() => {
    resetLocalStorageOnBreakingChange()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Main />
      </div>
    </ThemeProvider>
  )
}

export default App
