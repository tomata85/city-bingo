import { Box, Card, CardMedia } from '@mui/material'
import React, { ReactElement } from 'react'
import { BoardInstanceItemType } from '../../types'
import { useTranslation } from 'react-i18next'
import ItemRating from '../infrastructure/ItemRating'

export default function DoneItemCard (props: {
  item: BoardInstanceItemType
}): ReactElement {
  const { item } = props
  const { t } = useTranslation()

  return (
    <Card sx={{ minWidth: '100px' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          sx={{ height: '90px' }}
          image={item.imageUrl}
          title={t(item.id)}
        />
      </Box>
    </Card>
  )
}
