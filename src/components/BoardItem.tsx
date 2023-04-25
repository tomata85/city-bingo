import { type BoardItemType } from '../types'
import './styles.css'
import React, { useEffect, type ReactElement, useState } from 'react'

export interface BoardItemProps {
  item: BoardItemType
  onClick: (id: string) => void
}

export default function BoardItem (props: BoardItemProps): ReactElement {
  const { item, onClick } = props
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handleOnClick = (): void => {
    onClick(item.id)
  }

  useEffect(() => {
    if (item.photo != null) {
      const objectUrl = URL.createObjectURL(item.photo?.media)
      setPhotoPreview(objectUrl)
      return () => { URL.revokeObjectURL(objectUrl) }
    }
  }, [])

  return (
    <div
      className={`board-item-container ${
        item.checked ? 'board-item_checked' : ''
      }`}
      onClick={handleOnClick}
    >
      {photoPreview !== undefined && <img id="board-item_photo-cover" src={photoPreview} />}
      {/* <img className='board-item_photo-cover' src={URL} /> */}
      <div>{item.text}</div>
    </div>
  )
}
