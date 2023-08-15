import React, { useState, type ReactElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonPane from '../Infrastructure/ButtonPane'
import { Box, Button } from '@mui/material'
import { BoardInstanceItemType } from '../../types'

export interface InformationPageProps {
  item: BoardInstanceItemType
  onClose: (done: boolean) => void
}

export default function InformationPage (
  props: InformationPageProps
): ReactElement {
  const { item, onClose } = props
  const { t } = useTranslation()

  const onSave = (): void => {
    onClose(true)
  }

  const onCancel = (): void => {
    onClose(false)
  }

  return (
    <>
      <Box sx={{ margin: '30px', textAlign: 'left' }}>
        <p>{t('item_a_description')}</p>
      </Box>
      <ButtonPane>
        <Button sx={{ mx: '5px' }} variant="outlined" onClick={onCancel}>
          {t('did_it_button_back')}
        </Button>
        <Button sx={{ mx: '5px' }} variant="outlined" onClick={onSave}>
          Next
        </Button>
      </ButtonPane>
    </>
  )
}
