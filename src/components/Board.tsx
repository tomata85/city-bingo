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

function boardRow (items: string[]) {
  return (
    <tr>
      {
        items.map((itemName) =>
        <th>
          <BoardItem item={itemName}/>
        </th>)
      }
    </tr>);
}

export default function Board () {
  return (
    <div className="board-container">
      <table>
        <tbody>
          { [0,3,6].map(i => boardRow(itemNames.slice(i,i+3))) }
      </tbody>
    </table>
  </div>)
}
