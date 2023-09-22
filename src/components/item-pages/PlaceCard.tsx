import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import React, { ReactElement } from 'react'
import { Place } from '../../types'
import LaunchIcon from '@mui/icons-material/Launch'

export default function PlaceCard (props: { place: Place }): ReactElement {
  const { place } = props
  const onCardClick = () => {
    window.open(place.url, '_blank')
  }
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardActionArea onClick={onCardClick}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            sx={{ height: 100 }}
            image={place.photoUrl}
            title={place.name}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bgcolor: 'rgba(0, 0, 0, 0.54)',
              color: 'white',
              padding: '10px',
              borderRadius: '6px'
            }}
          >
            <LaunchIcon fontSize="small"/>
          </Box>
        </Box>
        <CardContent>
          <Typography variant="subtitle1" component="div">
          {place.name}
          </Typography>
          <Typography variant="body1" component="div">
          {place.moreInfo}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
