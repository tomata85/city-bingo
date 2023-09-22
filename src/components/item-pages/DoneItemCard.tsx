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
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '23%',
            bgcolor: 'rgba(0, 0, 0, 0.54)',
            color: 'white',
            textAlign: 'left',
            pt: '2px',
            pl: '5px'
          }}
        >
          <ItemRating rating={item.rating ?? null} readOnly={true} small={true} />
        </Box>
      </Box>
    </Card>
  )
}
