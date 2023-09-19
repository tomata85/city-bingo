import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, { ReactElement } from 'react-markdown/lib/react-markdown'

export default function GoogleMapCard (): ReactElement {
  const onCardClick = () => {
    window.open('http://www.w3schools.com', '_blank')
  }
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardActionArea onClick={onCardClick}>
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
      </CardActionArea>
    </Card>
  )
}
