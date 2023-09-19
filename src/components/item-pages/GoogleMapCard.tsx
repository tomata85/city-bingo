import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { ReactElement } from 'react-markdown/lib/react-markdown'

export default function GoogleMapCard (): ReactElement {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardMedia
        sx={{ height: 100 }}
        image="bansko-title3.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography variant="h6" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  )
}
