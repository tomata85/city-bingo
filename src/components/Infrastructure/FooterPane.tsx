import React, { type ReactElement } from 'react'
import { Box } from '@mui/material'
import '../styles.css'

interface FooterPaneProps {
  children: React.ReactNode
}

export default function FooterPane (props: FooterPaneProps): ReactElement {
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50px'
        }}
        component="footer"
      >
        {props.children}
      </Box>
    </>
  )
}
