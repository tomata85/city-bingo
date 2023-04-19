import { type BoardItemType } from '../types'
import './styles.css'
import React, { type ReactElement } from 'react'

export interface BoardItemProps {
  item: BoardItemType
  onClick: (id: string) => void
}

export default function BoardItem (props: BoardItemProps): ReactElement {
  const { item, onClick } = props

  const handleOnClick = (): void => {
    onClick(item.id)
  }

  return (
    <div
      className={`board-item-container ${
        item.checked ? 'board-item_checked' : ''
      }`}
      onClick={handleOnClick}
    >
      <div>{item.text}</div>
    </div>
  )
}
