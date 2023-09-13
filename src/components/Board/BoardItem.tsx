import { type BoardInstanceItemType } from '../../types'
import '../styles.css'
import React, { type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { styled, Paper } from '@mui/material'

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

  // TODO: bring back image?
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: item.checked ? '#ffe300' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '60px'
  }))

  return (
    <Item>
      <div onClick={handleOnClick}>
        <div>{t(item.id)}</div>
      </div>
    </Item>
  )
}
