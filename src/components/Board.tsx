import React, { useState } from 'react';
import BoardItem from '../components/BoardItem'
import './styles.css';
import { generateUserBoard } from '../utils'

export default function Board (props : {userId: string, destinationId: string}) {
  const userBoard = generateUserBoard(props);
  const state = useState({...props, userBoard: userBoard})
  return (
    <div className="board-container">
       {
        Object.values(userBoard).map((itemName) =>
          <BoardItem key={itemName} item={itemName}/>)
      }
  </div>)
}
