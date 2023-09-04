import { type BoardInstanceItemType } from '../../types'
import '../styles.css'
import React, { type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

export interface BoardItemProps {
  item: BoardInstanceItemType
  onClick: (id: string) => void
}

export default function BoardItem (props: BoardItemProps): ReactElement {
  const { item, onClick } = props

  const { t } = useTranslation()

  const handleOnClick = (): void => {
    onClick(item.id)
  }

  const textClassName = item.checked ? 'item-text_checked' : 'item-text'
  const imageCover =
    item.imageUrl != null
      ? (
      <img className="board-item_photo-cover" src={item.imageUrl} />
        )
      : item.checked && item.imageUrl == null
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
