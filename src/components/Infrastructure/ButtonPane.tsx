import React, { type ReactElement } from 'react'
import { Box, Button } from '@mui/material'
import '../styles.css'

interface ButtonPaneProps {
  nextText: string
  backText: string
  onNext: () => void
  onBack: () => void
}

export default function ButtonPane (props: ButtonPaneProps): ReactElement {
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '#cfd8dc',
          px: '15px',
          py: '15px',
          boxSizing: 'border-box'
        }}
        component="footer"
      >
        <Button sx={{ mx: '5px' }} variant="outlined" onClick={props.onBack}>
          {props.backText}
        </Button>
        <Button sx={{ mx: '5px' }} variant="outlined" onClick={props.onNext}>
          {props.nextText}
        </Button>
      </Box>
    </>
  )
}
