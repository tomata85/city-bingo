import React, { useState } from 'react';
import BoardItem from '../components/BoardItem'
import './styles.css';
import { getUserBoard } from '../utils'
import { toggleCheckItem } from '../api'

export default function Board (props : {userId: string, destinationId: string}) {
  const [board, setBoard] = useState(getUserBoard(props));

  const onClickItem = (itemId: string) => {
    setBoard({...board, [itemId]: {...board[itemId], checked: !board[itemId].checked}});
    toggleCheckItem(itemId);
  }

  return (
    <div className="board-container">
       {
        Object.values(board).map(item =>
          <BoardItem
            key={item.id}
            item={item}
            onClick={onClickItem}/>)
      }
  </div>)
}
