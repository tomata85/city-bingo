import React, { type ReactElement } from 'react'
import './App.css'
import Board from './components/Board'

function App (): ReactElement {
  return (
    <div className="App">
      <header>Welcome back Oren,</header>
      <h1 className="title">Koh Lanta Bingo</h1>
      <Board userId="Oren Chazan" destinationId="Bansko" />
    </div>
  )
}

export default App
