import React from 'react';
import BoardItem from '../components/BoardItem'
import './styles.css';

const itemNames = [
  'Hot Springs',
  'Hike Pirin mountains',
  'Watch a sunset',
  'Picnic in Pirin forest',
  'Have a Banitza',
  'Visit a co-work',
  'Hike to Bezbog hut',
  'Smoothie at Coconut',
  'Belizmata lake'
]

export default function Board () {
  return (
    <div className="board-container">
       {
        itemNames.map((itemName) =>
          <BoardItem key={itemName} item={itemName}/>)
      }
  </div>)
}
