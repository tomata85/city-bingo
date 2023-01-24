import React, { useState } from 'react';
import BoardItem from '../components/BoardItem'
import './styles.css';
import { generateUserBoard } from '../utils'
import { toggleCheckItem } from '../api'

export default function Board (props : {userId: string, destinationId: string}) {
  const userBoard = generateUserBoard(props);
  const [board, setBoard] = useState({userBoard: userBoard})

  const onClickItem = (itemId: string) => {
    // setBoard(board);
    toggleCheckItem(itemId);
  }

  return (
    <div className="board-container">
       {
        Object.entries(userBoard).map((item) =>
          <BoardItem
            key={item[0]}
            id={item[0]}
            text={item[1]}
            onClick={onClickItem}/>)
      }
  </div>)
}
