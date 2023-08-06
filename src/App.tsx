import React, { type ReactElement } from 'react'
import './App.css'
import Main from './components/Main'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(',')
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
