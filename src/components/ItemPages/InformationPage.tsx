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
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const initalize = async () => {
      const res = await import(`../../i18n/descriptions/${i18n.language}/bansko/${item.id}.md`)
      const res2 = await fetch(res.default)
      const res3 = await res2.text()
      SetDescription(res3)
    }

    void initalize()
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
