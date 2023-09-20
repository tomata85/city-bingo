import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, { ReactElement } from 'react-markdown/lib/react-markdown'
import { Place } from '../../types'

export default function GoogleMapCard (props: { place: Place }): ReactElement {
  const { place } = props
  const onCardClick = () => {
    window.open(place.googleMapsLink, '_blank')
  }
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardActionArea onClick={onCardClick}>
        <CardMedia
          sx={{ height: 100 }}
          // eslint-disable-next-line max-len
          image={place.photoUrl}
          title={place.name}
        />
        <CardContent>
          <Typography variant="subtitle1" component="div">
          {place.name}
          </Typography>
          <Typography variant="body1" component="div">
          {place.moreInfo}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Maybe I'll have more info here i n
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
