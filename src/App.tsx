import React, { type ReactElement } from 'react'
import './App.css'
import Board from './components/Board'
import DidItPage from './components/DidItPage'

function App (): ReactElement {
  return (
    <div className="App">
      <header>Welcome back Yulia</header>
      <h1 className="title">Bansko Bingo</h1>
      {/* <Board userId="Oren Chazan" destinationId="Bansko" /> */}
      <DidItPage/>
    </div>
  )
}

export default App
