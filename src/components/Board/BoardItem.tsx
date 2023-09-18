import { BINGO_SIZE, type BoardInstanceItemType } from '../../types'
import '../styles.css'
import React, { type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { styled, Paper } from '@mui/material'
import Box from '@mui/system/Box'
import { COLOR_BLACKISH, COLOR_HAPPY_YELLOW, COLOR_WHITE } from '../../App'

export interface BoardItemProps {
  item: BoardInstanceItemType
  onClick: (id: string) => void
}

export default function BoardItem (props: BoardItemProps): ReactElement {
  const ITEM_HEIGHT = BINGO_SIZE < 5 ? '67px' : '57px'
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
      <img className="board-item_photo-cover" src={'thumb-up.jpg'} />
          )
        : null

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: item.checked ? COLOR_HAPPY_YELLOW : COLOR_WHITE,
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'left',
    color: COLOR_BLACKISH,
    height: ITEM_HEIGHT // TODO: make height relative to width
  }))

  return (
    <Box onClick={handleOnClick}>
      <Item>{t(item.id)}</Item>
    </Box>
  )
}
