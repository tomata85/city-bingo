import { getItemImageFromStorage } from '../logic/local-storage'
import { type BoardItemType } from '../types'
import './styles.css'
import React, { useEffect, type ReactElement, useState } from 'react'

export interface BoardItemProps {
  item: BoardItemType
  onClick: (id: string) => void
}

export default function BoardItem (props: BoardItemProps): ReactElement {
  const { item, onClick } = props
  const [imageData, setImageData] = useState<string | undefined>()

  const handleOnClick = (): void => {
    onClick(item.id)
  }

  useEffect(() => {
    const data = getItemImageFromStorage(item.id)
    if (data != null) {
      setImageData(data)
    }
  }, [])

  const textClassName = imageData == null ? 'item-text' : 'item-text_checked'

  return (
    <div
      className={`board-item-container ${
        item.checked ? 'board-item_checked' : ''
      }`}
      onClick={handleOnClick}
    >
      {(imageData != null) && <img className="board-item_photo-cover" src={imageData} />}
      <div className={textClassName}>{item.text}</div>
    </div>
  )
}
