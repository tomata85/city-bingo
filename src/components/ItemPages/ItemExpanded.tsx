import React, { useState, type ReactElement } from 'react'
import DidItPage from './DidItPage'
import { useTranslation } from 'react-i18next'
import AppBar from '@mui/material/AppBar'
import { Box, IconButton, Toolbar, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import InformationPage from './InformationPage'
import { BoardInstanceItemType } from '../../types'

export enum ShownPageType {
  Information,
  DidIt,
}

export interface ItemExpandedProps {
  item: BoardInstanceItemType
  onClose: (done: boolean) => void
}

export default function ItemExpanded (props: ItemExpandedProps): ReactElement {
  const [shownPageType, setShownPageType] = useState<ShownPageType>(
    ShownPageType.Information
  )

  const { item } = props
  const { t } = useTranslation()

  const onBackArrowClick = (): void => {
    props.onClose(false)
  }

  const onChangePage = (page: ShownPageType): void => {
    setShownPageType(page)
  }

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
              onClick={onBackArrowClick}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t(item.id)}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {shownPageType === ShownPageType.Information
        ? (
      <InformationPage {...props} />
          )
        : (
      <DidItPage {...props} />
          )}
    </>
  )
}
