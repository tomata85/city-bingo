import { Box, CircularProgress } from '@mui/material'
import React, { ReactElement } from 'react'

export default function Loading (): ReactElement {
  return (
    <Box sx={{ mt: '100px', display: 'flex', justifyContent: 'center' }}>
      <CircularProgress color="secondary"/>
    </Box>
  )
}
