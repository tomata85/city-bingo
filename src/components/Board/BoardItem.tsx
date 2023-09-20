import { BINGO_SIZE, type BoardInstanceItemType } from '../../types'
import '../styles.css'
import React, { type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { styled, Paper } from '@mui/material'
import Box from '@mui/system/Box'
import { COLOR_TURQUISE, COLOR_WHITE } from '../../App'

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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: item.checked ? COLOR_TURQUISE : COLOR_WHITE,
    ...theme.typography.body1,
    padding: theme.spacing(0.75),
    verticalAlign: 'center',
    textAlign: 'center',
    height: ITEM_HEIGHT // TODO: make height relative to width
  }))

  return (
    <Box onClick={handleOnClick}>
      <Item>{t(item.id)}</Item>
    </Box>
  )
}
