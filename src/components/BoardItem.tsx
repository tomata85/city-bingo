import { type BoardItemType } from '../types'
import './styles.css'
import React, { type ReactElement } from 'react'

export default function BoardItem (props: {
  item: BoardItemType
  onClick: (id: string) => void
}): ReactElement {
  const { item, onClick } = props

  const handleOnClick = (): void => {
    onClick(item.id)
  }

  return (
    <div className={`board-item-container ${item.checked ? 'board-item_checked' : ''}`}>
      <div onClick={handleOnClick}>
        {item.text}
      </div>
    </div>
  )
}
