import React, { type ReactElement } from 'react'
import { Box } from '@mui/material'
import { ItemPagesProps } from './ItemPagesContainer'
import ReactMarkdown from 'react-markdown'

export default function ItemInformationPage (props: ItemPagesProps): ReactElement {
  const { description } = props

  return (
    <>
      <Box>
        <ReactMarkdown>{description}</ReactMarkdown>
      </Box>
    </>
  )
}
