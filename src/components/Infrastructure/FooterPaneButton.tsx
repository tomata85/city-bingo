import { Button, CircularProgress } from '@mui/material'
import React, { ReactElement } from 'react'

export interface FooterPaneButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
  progress?: boolean
}

export default function FooterPaneButton (
  props: FooterPaneButtonProps
): ReactElement {
  const { text, onClick, disabled = false, progress = false } = props

  return (
    <Button
      sx={{ height: '100%', width: '100%' }}
      variant="contained"
      onClick={onClick}
      disabled={disabled}
    >
      {progress ? <CircularProgress sx={{ my: '5px' }} color="secondary"/> : text}
    </Button>
  )
}
