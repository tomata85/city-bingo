import React, { useState, type ReactElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import FooterPane from '../Infrastructure/FooterPane'
import { Box, Button } from '@mui/material'
import { ItemPagesProps, ShownPageType } from './ItemPagesContainer'
import FooterPaneButton from '../Infrastructure/FooterPaneButton'

export default function InformationPage (props: ItemPagesProps): ReactElement {
  const { item, onClose, onChangePage } = props
  const { t } = useTranslation()

  const onNext = (): void => {
    onChangePage(ShownPageType.DidIt)
  }

  const onCancel = (): void => {
    onClose(false)
  }

  return (
    <>
      <Box sx={{ margin: '30px', textAlign: 'left' }}>
        <p>{t('item_a_description')}</p>
      </Box>
      <FooterPane>
        <FooterPaneButton text={t('did_it_button_back')} onClick={onCancel} />
        <FooterPaneButton text={'Next'} onClick={onNext} />
      </FooterPane>
    </>
  )
}
