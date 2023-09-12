import React, { useState, type ReactElement } from 'react'
import DidItPage from './DidItPage'
import { useTranslation } from 'react-i18next'
import AppBar from '@mui/material/AppBar'
import { Box, IconButton, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import InformationPage from './InformationPage'
import { BoardInstanceItemType } from '../../types'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import FooterPane from '../Infrastructure/FooterPane'
import FooterPaneButton from '../Infrastructure/FooterPaneButton'

export interface ItemPagesProps {
  item: BoardInstanceItemType
  onClose: (updatedItem: BoardInstanceItemType) => void
}

export default function ItemPagesContainer (
  props: ItemPagesProps
): ReactElement {
  const [tabIndex, setTabIndex] = useState('tabs_info')
  const [showDidIt, setShowDidIt] = useState(false)

  const { item } = props
  const { t } = useTranslation()

  const onCloseButtonClick = (): void => {
    props.onClose(item)
  }

  const onTabChanged = (
    event: React.SyntheticEvent,
    newTabIndex: string
  ): void => {
    setTabIndex(newTabIndex)
  }

  const footerButton = item.checked
    ? (
    <FooterPaneButton text={t('item_close')} onClick={onCloseButtonClick} />
      )
    : (
    <FooterPaneButton
      text={t('item_did_it')}
      onClick={() => {
        setShowDidIt(true)
      }}
    />
      )

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
              onClick={onCloseButtonClick}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t(item.id)}
            </Typography>
          </Toolbar>
        </AppBar>
        {showDidIt
          ? (
          <DidItPage {...props} />
            )
          : (
          <>
            <TabContext value={tabIndex}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={onTabChanged}
                  aria-label="Item Tabs"
                  centered
                >
                  <Tab label={t('tabs_info')} value="tabs_info" />
                  <Tab label={t('tabs_reviews')} value="tabs_reviews" />
                </TabList>
              </Box>
              <TabPanel value="tabs_info">
                <InformationPage {...props} />
              </TabPanel>
              <TabPanel value="tabs_reviews">Soon....</TabPanel>
            </TabContext>
            <FooterPane>
              {footerButton}
            </FooterPane>
          </>
            )}
      </Box>
    </>
  )
}
