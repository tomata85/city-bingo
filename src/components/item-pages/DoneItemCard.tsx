import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import React, { ReactElement } from 'react'
import { BoardInstanceItemType } from '../../types'
import { useTranslation } from 'react-i18next'

export default function DoneItemCard (props: {
  item: BoardInstanceItemType
}): ReactElement {
  const { item } = props
  const { t } = useTranslation()

  return (
    <Card sx={{ minWidth: '100px' }}>
      <CardMedia sx={{ height: '100px' }} image={item.imageUrl} title={t(item.id)} />
      <CardContent>
        <Typography variant="body1" component="div">
          {t(item.id)}: {item.rating}
        </Typography>
      </CardContent>
    </Card>
  )
}
