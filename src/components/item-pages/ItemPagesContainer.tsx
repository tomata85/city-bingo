import React, { useState, type ReactElement } from 'react'
import DidItPage from './ItemDidItPage'
import { useTranslation } from 'react-i18next'
import { Fab, IconButton, Toolbar, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import InformationPage from './ItemInformationPage'
import { BoardInstanceItemType } from '../../types'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

export interface ItemPagesProps {
  item: BoardInstanceItemType
  description: string
  onClose: (updatedItem: BoardInstanceItemType) => void
}

export default function ItemPagesContainer (
  props: ItemPagesProps
): ReactElement {
  const [showDidIt, setShowDidIt] = useState(true)

  const { item, onClose } = props
  const { t } = useTranslation()

  const onCloseButtonClick = (): void => {
    onClose(item)
  }

  return (
    <>
      <Toolbar sx={{ p: 0, justifyContent: 'left', alignItems: 'flex-end' }}>
        <IconButton edge="start" aria-label="menu" onClick={onCloseButtonClick}>
          <ArrowBackIosIcon color={'secondary'} />
        </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {t(item.id)}
        </Typography>
      </Toolbar>
      {showDidIt
        ? (
        <DidItPage {...props} />
          )
        : (
        <>
          <InformationPage {...props} />
          {!item.checked && (
            <Fab
              sx={{
                m: 0,
                top: 'auto',
                right: 'auto',
                bottom: 70,
                left: 'auto',
                position: 'fixed',
                width: '90%'
              }}
              size="large"
              color="primary"
              variant="extended"
              onClick={() => {
                setShowDidIt(true)
              }}
            >
              <CheckCircleOutlineIcon sx={{ mr: 1 }} />I Did It!
            </Fab>
          )}
        </>
          )}
    </>
  )
}
