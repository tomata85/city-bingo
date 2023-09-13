import React, { useState, type ReactElement } from 'react'
import DidItPage from './DidItPage'
import { useTranslation } from 'react-i18next'
import { Box, IconButton, Toolbar, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
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
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
        >
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
              >
                <Tab label={t('tabs_info')} value="tabs_info" />
                <Tab label={t('tabs_reviews')} value="tabs_reviews" />
              </TabList>
            </Box>
            <TabPanel sx={{ p: 0 }} value="tabs_info">
              <InformationPage {...props} />
            </TabPanel>
            <TabPanel sx={{ p: 0, mt: '10px' }} value="tabs_reviews">
              Soon....
            </TabPanel>
          </TabContext>
          <FooterPane>{footerButton}</FooterPane>
        </>
          )}
    </>
  )
}
