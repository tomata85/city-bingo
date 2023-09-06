import React, { useState, type ReactElement } from 'react'
import DidItPage from './DidItPage'
import { useTranslation } from 'react-i18next'
import AppBar from '@mui/material/AppBar'
import { Box, IconButton, Toolbar, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import InformationPage from './InformationPage'
import { BoardInstanceItemType } from '../../types'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

export interface ItemPagesContainerProps {
  item: BoardInstanceItemType
  onClose: (done: boolean, imageUrl?: string) => void
}

export interface ItemPagesProps {
  item: BoardInstanceItemType
  onClose: (done: boolean, imageUrl?: string) => void
}

export default function ItemPagesContainer (
  props: ItemPagesContainerProps
): ReactElement {
  const [tabIndex, setTabIndex] = useState('tabs_info')

  const { item } = props
  const { t } = useTranslation()

  const onBackArrowClick = (): void => {
    props.onClose(false)
  }

  const onTabChanged = (
    event: React.SyntheticEvent,
    newTabIndex: string
  ): void => {
    setTabIndex(newTabIndex)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
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
        <TabContext value={tabIndex}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={onTabChanged} aria-label="Item Tabs" centered>
              <Tab label={t('tabs_info')} value="tabs_info" />
              <Tab label={t('tabs_reviews')} value="tabs_reviews" />
              <Tab label={t('tabs_did_it')} value="tabs_did_it" />
            </TabList>
          </Box>
          <TabPanel value="tabs_info">
            <InformationPage {...props} />
          </TabPanel>
          <TabPanel value="tabs_reviews">Soon....</TabPanel>
          <TabPanel value="tabs_did_it">
            <DidItPage {...props} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
