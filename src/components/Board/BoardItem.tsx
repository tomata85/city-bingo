import { getItemImageFromStorage } from '../../logic/local-storage'
import { type BoardInstanceItemType } from '../../types'
import '../styles.css'
import React, { useEffect, type ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface BoardItemProps {
  item: BoardInstanceItemType
  onClick: (id: string) => void
}

export default function BoardItem (props: BoardItemProps): ReactElement {
  const { item, onClick } = props
  const [imageData, setImageData] = useState<string | undefined>()

  const { t } = useTranslation()

  const handleOnClick = (): void => {
    onClick(item.id)
  }

  useEffect(() => {
    const data = getItemImageFromStorage(item.id)
    if (data != null) {
      setImageData(data)
    }
  }, [])

  const textClassName = item.checked ? 'item-text_checked' : 'item-text'
  const imageCover =
    imageData != null
      ? (
      <img className="board-item_photo-cover" src={imageData} />
        )
      : item.checked && imageData == null
        ? (
      <img className="board-item_photo-cover" src={'checkmark-512.jpg'} />
          )
        : null

  return (
    <div
      className={`board-item-container ${
        item.checked ? 'board-item_checked' : ''
      }`}
      onClick={handleOnClick}
    >
      {imageCover}
      <div className={textClassName}>{t(item.id)}</div>
    </div>
  )
}
