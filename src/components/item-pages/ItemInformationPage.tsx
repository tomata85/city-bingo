import React, { type ReactElement } from 'react'
import { Box, List, Stack, Typography } from '@mui/material'
import { ItemPagesProps } from './ItemPagesContainer'
import ReactMarkdown from 'react-markdown'
import GoogleMapCard from './GoogleMapCard'
import { PLACES_DETAILS } from '../../data/places-details'
import { Place } from '../../types'

export default function ItemInformationPage (
  props: ItemPagesProps
): ReactElement {
  const { description } = props
  const places: Place[] = PLACES_DETAILS[props.item.id]

  return (
    <Box sx={{ mt: '20px' }}>
      <Typography variant={'body2'}>
        <ReactMarkdown>{description}</ReactMarkdown>
      </Typography>
      <Typography variant={'h6'}>Recommended Places</Typography>
      <Typography variant={'body2'}>
        Clicking a place will open it in a new tab. You can always go back to
        City Bingo tab on your browser.
      </Typography>
      {places != null && (
        <List overflow={'auto'} component={Stack} direction={'row'} spacing={1}>
          {places.map((place) => (
            <GoogleMapCard key={place.placeId} place={place} />
          ))}
        </List>
      )}
    </Box>
    //
  )
}
