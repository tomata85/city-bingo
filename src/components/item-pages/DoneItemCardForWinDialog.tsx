import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import { BoardInstanceItemType } from '../../types'
import { useTranslation } from 'react-i18next'

export default function DoneItemCardForWinDialog (props: {
  item: BoardInstanceItemType
}): ReactElement {
  const { item } = props
  const { t } = useTranslation()

  return (
    <Card sx={{ minWidth: '100px' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          sx={{ height: '300px' }}
          image={item.imageUrl}
          title={t(item.id)}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '18%',
            bgcolor: 'rgba(255, 255, 255, 0.54)',
            color: 'white',
            textAlign: 'left',
            pb: '5px',
            pl: '5px'
          }}
        >
          <CardContent>
            <Typography variant="h4" component="div">
              {t(item.id)}
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </Card>
  )
}
