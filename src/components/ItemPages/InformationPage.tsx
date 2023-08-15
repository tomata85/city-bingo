import React, { useState, type ReactElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import FooterPane from '../Infrastructure/FooterPane'
import { Box } from '@mui/material'
import { ItemPagesProps, ShownPageType } from './ItemPagesContainer'
import FooterPaneButton from '../Infrastructure/FooterPaneButton'
import ReactMarkdown from 'react-markdown'

export default function InformationPage (props: ItemPagesProps): ReactElement {
  const { item, onClose, onChangePage } = props
  const [description, SetDescription] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    import('../../i18n/descriptions/en/bansko/item_a.md')
      .then(res => {
        fetch(res.default)
          .then(async res => await res.text())
          .then(res => { SetDescription(res) })
          .catch(err => { console.log(err) })
      })
      .catch(err => { console.log(err) })
  }, [])

  const onNext = (): void => {
    onChangePage(ShownPageType.DidIt)
  }

  const onCancel = (): void => {
    onClose(false)
  }

  return (
    <>
      <Box sx={{ margin: '30px', textAlign: 'left' }}>
        <ReactMarkdown>{description}</ReactMarkdown>
      </Box>
      <FooterPane>
        <FooterPaneButton text={t('did_it_button_back')} onClick={onCancel} />
        <FooterPaneButton text={'Next'} onClick={onNext} />
      </FooterPane>
    </>
  )
}
