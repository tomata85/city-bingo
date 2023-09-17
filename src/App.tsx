import React, { useEffect, type ReactElement } from 'react'
import './App.css'
import Main from './components/Main'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { resetLocalStorageOnBreakingChange } from './io/local-storage'

export const COLOR_HAPPY_YELLOW = '#FFE300'
export const COLOR_BLACKISH = '#524856'

const headerFont = {
  fontFamily: 'Josefin Sans',
  color: COLOR_BLACKISH
}
const mainHeaderFont = {
  ...headerFont,
  fontWeight: '800'
}
const theme = createTheme({
  typography: {
    fontFamily: ['Urbanist', 'sans-serif'].join(','),
    h1: mainHeaderFont,
    h2: mainHeaderFont,
    h3: headerFont,
    h4: headerFont,
    h5: headerFont,
    h6: headerFont
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
