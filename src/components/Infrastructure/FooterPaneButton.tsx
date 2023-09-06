import { Button } from '@mui/material'
import React, { ReactElement } from 'react'

export interface FooterPaneButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
}

export default function FooterPaneButton (
  props: FooterPaneButtonProps
): ReactElement {
  const { text, onClick, disabled = false } = props

  return (
    <Button sx={{ mx: '5px' }} variant="contained" onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  )
}
