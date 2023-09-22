import React, { useState, type ReactElement } from 'react'
import { Box, Button, List, Stack, Typography } from '@mui/material'
import { ItemPagesProps } from './ItemPagesContainer'
import ReactMarkdown from 'markdown-to-jsx'
import PlaceCard from './PlaceCard'
import { PLACES_DETAILS } from '../../data/places-details'
import { Place } from '../../types'
import { useTranslation } from 'react-i18next'
import PlacesHelpDialog from '../infrastructure/PlacesHelpDialog'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

export default function ItemInformationPage (
  props: ItemPagesProps
): ReactElement {
  const { description } = props
  const places: Place[] = PLACES_DETAILS[props.item.id]
  const { t } = useTranslation()
  const [showPlacesHelpDialog, setShowPlacesHelpDialog] = useState(false)
  const TITLE_STYLE = {
    mt: '30px',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }ß∂

  const options = {
    overrides: {
      p: {
        component: Typography,
        props: { paragraph: true, variant: 'body2' }
      }
    }
  }

  const onClosePlacesHelpDialog = () => {
    setShowPlacesHelpDialog(false)
  }

  return (
    <Box sx={{ mt: '20px' }}>
      <ReactMarkdown options={options}>{description}</ReactMarkdown>
      {places.length > 0 && (
        <>
          <Box display="flex" sx={TITLE_STYLE}>
            <Typography display="inline" variant={'h6'}>
              {t('info_places_title')}
            </Typography>
            <Button
              color="secondary"
              onClick={() => {
                setShowPlacesHelpDialog(true)
              }}
            >
              <HelpOutlineIcon />
            </Button>
          </Box>
          <List
            overflow={'auto'}
            component={Stack}
            direction={'row'}
            spacing={1}
            sx={{ mb: '10px' }}
          >
            {places.map((place) => (
              <PlaceCard key={place.placeId} place={place} />
            ))}
          </List>
          <PlacesHelpDialog
            open={showPlacesHelpDialog}
            onClose={onClosePlacesHelpDialog}
          />
        </>
      )}
    </Box>
    //
  )
}
