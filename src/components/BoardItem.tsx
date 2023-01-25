import { BoardItemType } from "../types";
import "./styles.css"
import React, { useState } from 'react';

export default function BoardItem(props : {item: BoardItemType, onClick: (id:string)=>void }) {
  const { item, onClick } = props;

  const handleOnClick = () => {
    onClick(item.id);
  }

  // TODO: put it on the container
  const itemClassName = item.checked ? 'board-item_checked' : 'board-item';

  return (
    <div className="board-item-container">
      <div className={itemClassName} onClick={handleOnClick}>{item.text}</div>
    </div>
  )
}
