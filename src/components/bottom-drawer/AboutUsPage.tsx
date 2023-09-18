import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactElement } from 'react'

export function AboutUsPage (): ReactElement {
  return (
    <Box sx={{ mt: '30px', mb: '15px' }}>
      <Typography display="inline" variant="h3">
        About Us
      </Typography>
      <Box>
        City Bingo is lovingly done by Talya Stern, together with Oren Chazan.
        We could not have done it without the supports of these special people:

        ⭐ Dana Golds for design
        ⭐ This and this for icon from noun project
        ⭐ ...

        Want to be a supporter as well? here’s how: 1. Buy me a cup of
        coffee 2. Give feedback!
      </Box>
    </Box>
  )
}
