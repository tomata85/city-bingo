import React, { type ReactElement } from 'react'
import { Box, List, Stack, Typography } from '@mui/material'
import { ItemPagesProps } from './ItemPagesContainer'
import ReactMarkdown from 'markdown-to-jsx'
import GoogleMapCard from './GoogleMapCard'
import { PLACES_DETAILS } from '../../data/places-details'
import { Place } from '../../types'
import InformationBox from '../infrastructure/InformationBox'
import { useTranslation } from 'react-i18next'

export default function ItemInformationPage (
  props: ItemPagesProps
): ReactElement {
  const { description } = props
  const places: Place[] = PLACES_DETAILS[props.item.id]
  const { t } = useTranslation()

  const options = {
    overrides: {
      p: {
        component: Typography,
        props: { paragraph: true, variant: 'body2' }
      }
    }
  }

  return (
    <Box sx={{ mt: '20px' }}>
      <ReactMarkdown options={options}>{description}</ReactMarkdown>
      {places.length > 0 && (
        <>
          <Typography variant={'h6'}>{t('info_places_title')}</Typography>
          <List
            overflow={'auto'}
            component={Stack}
            direction={'row'}
            spacing={1}
            sx={{ mb: '10px' }}
          >
            {places.map((place) => (
              <GoogleMapCard key={place.placeId} place={place} />
            ))}
          </List>
          <InformationBox
            showCloseButton={false}
            text={t('info_click_place')}
          />
        </>
      )}
    </Box>
    //
  )
}
