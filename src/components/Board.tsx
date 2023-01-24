import React, { useState } from 'react';
import BoardItem from '../components/BoardItem'
import './styles.css';
import { generateUserBoard } from '../utils'
import { toggleCheckItem } from '../api'

export default function Board (props : {userId: string, destinationId: string}) {
  const userBoard = generateUserBoard(props);
  //const [board, setBoard] = useState({userBoard: userBoard})

  const onClickItem = (itemId: string) => {
    // setBoard(board);
    toggleCheckItem(itemId);
  }

  return (
    <div className="board-container">
       {
        userBoard.map((item) =>
          <BoardItem
            item={item}
            onClick={onClickItem}/>)
      }
  </div>)
}
