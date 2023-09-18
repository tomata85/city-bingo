import React, { useState, type ReactElement } from 'react'
import DidItPage from './ItemDidItPage'
import { useTranslation } from 'react-i18next'
import { Box, Fab, IconButton, Toolbar, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import InformationPage from './ItemInformationPage'
import { BoardInstanceItemType } from '../../types'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ItemReviewsPage from './ItemReviewsPage'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

export interface ItemPagesProps {
  item: BoardInstanceItemType
  description: string
  onClose: (updatedItem: BoardInstanceItemType) => void
}

export default function ItemPagesContainer (
  props: ItemPagesProps
): ReactElement {
  const [tabIndex, setTabIndex] = useState('tabs_info')
  const [showDidIt, setShowDidIt] = useState(false)

  const { item, onClose } = props
  const { t } = useTranslation()

  const onCloseButtonClick = (): void => {
    onClose(item)
  }

  const onTabChanged = (
    event: React.SyntheticEvent,
    newTabIndex: string
  ): void => {
    setTabIndex(newTabIndex)
  }

  return (
    <>
      <Toolbar sx={{ p: 0, pt: '15px', justifyContent: 'left' }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onCloseButtonClick}
        >
          <ArrowBackIosIcon />
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
          <TabContext value={tabIndex}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                sx={{ p: 0 }}
                onChange={onTabChanged}
                aria-label="Item Tabs"
                textColor="secondary"
                indicatorColor="primary"
              >
                <Tab label={t('tabs_info')} value="tabs_info" />
                <Tab label={t('tabs_reviews')} value="tabs_reviews" />
              </TabList>
            </Box>
            <TabPanel sx={{ p: 0 }} value="tabs_info">
              <InformationPage {...props} />
            </TabPanel>
            <TabPanel sx={{ p: 0, mt: '10px' }} value="tabs_reviews">
              <ItemReviewsPage {...props} />
            </TabPanel>
            {!item.checked && (
              <Fab
                sx={{
                  m: 0,
                  top: 'auto',
                  right: 20,
                  bottom: 70,
                  left: 'auto',
                  position: 'fixed'
                }}
                color="primary"
                variant="extended"
                onClick={() => { setShowDidIt(true) }}
              >
                <CheckCircleOutlineIcon sx={{ mr: 1 }} />I Did It!
              </Fab>
            )}
          </TabContext>
        </>
          )}
    </>
  )
}
