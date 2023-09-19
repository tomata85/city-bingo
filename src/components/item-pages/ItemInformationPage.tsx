import React, { type ReactElement } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  List,
  Stack,
  Typography
} from '@mui/material'
import { ItemPagesProps } from './ItemPagesContainer'
import ReactMarkdown from 'react-markdown'
import GoogleMapCard from './GoogleMapCard'

export default function ItemInformationPage (
  props: ItemPagesProps
): ReactElement {
  const { description } = props

  return (
    <Box sx={{ mt: '20px' }}>
      <List overflow={'auto'} component={Stack} direction={'row'} spacing={1}>
        <GoogleMapCard />
        <GoogleMapCard />
        <GoogleMapCard />
        <GoogleMapCard />
      </List>
      <ReactMarkdown>{description}</ReactMarkdown>
    </Box>
  )
}
