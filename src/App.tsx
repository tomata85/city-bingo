import React, { type ReactElement } from 'react'
import './App.css'
import Main from './components/Main'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const headerFont = {
  fontFamily: 'Josefin Sans'
}
const theme = createTheme({
  typography: {
    fontFamily: ['Urbanist', 'sans-serif'].join(','),
    h1: headerFont,
    h2: headerFont,
    h3: headerFont,
    h4: headerFont,
    h5: headerFont
  }
})

function App (): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Main />
      </div>
    </ThemeProvider>
  )
}

export default App
