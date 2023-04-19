import React, { type ReactElement } from 'react'
import './App.css'
import Board from './components/Board'

function App (): ReactElement {
  return (
    <div className="App">
      <Board userId="Oren Chazan" destinationId="Bansko" />
    </div>
  )
}

export default App
