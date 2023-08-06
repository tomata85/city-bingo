import React, { type ReactElement } from 'react'
import { BoardInstanceItemType } from '../../types'
import DidItPage from './DidItPage'
import { useTranslation } from 'react-i18next'
import './styles.css'
import AppBar from '@mui/material/AppBar'
import { Box, IconButton, Toolbar, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

export interface ItemDialogProps {
  item: BoardInstanceItemType
  onClose: (done: boolean) => void
}

export default function ItemExpanded (props: ItemDialogProps): ReactElement {
  const { item } = props
  const { t } = useTranslation()

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <ArrowBack/>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t(item.id)}
        </Typography>

      </Toolbar>
    </AppBar>
  </Box>
  <DidItPage {...props}/>
    </>
  )
}
