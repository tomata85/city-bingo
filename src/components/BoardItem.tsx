import { type BoardItemType } from '../types'
import './styles.css'
import React, { type ReactElement } from 'react'

export default function BoardItem (props: { item: BoardItemType, onClick: (id: string) => void }): ReactElement {
  const { item, onClick } = props

  const handleOnClick = (): void => {
    onClick(item.id)
  }

  // TODO: put it on the container
  const itemClassName = item.checked ? 'board-item_checked' : 'board-item'

  return (
    <div className="board-item-container">
      <div className={itemClassName} onClick={handleOnClick}>{item.text}</div>
    </div>
  )
}
