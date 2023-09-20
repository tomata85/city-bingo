import React, { useEffect, type ReactElement } from 'react'
import './App.css'
import Main from './components/Main'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { resetLocalStorageOnBreakingChange } from './io/local-storage'
import { BINGO_SIZE } from './types'

export const COLOR_HAPPY_YELLOW = '#FFE300'
export const COLOR_BLACKISH = '#524856'
export const COLOR_WHITE = '#fff'

const headerFont = {
  fontFamily: 'Josefin Sans',
  color: COLOR_BLACKISH
}
const mainHeaderFont = {
  ...headerFont,
  fontWeight: '800'
}
const subtitle1Font = {
  fontSize: 14
}
const boardItemFont = {
  fontSize: 13,
  fontWeight: BINGO_SIZE < 5 ? '400' : '800'
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
    body2: boardItemFont
  },
  palette: {
    primary: { main: COLOR_HAPPY_YELLOW },
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
