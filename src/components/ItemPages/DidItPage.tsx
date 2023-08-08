import React, { useState, type ReactElement, useEffect } from 'react'
import { BoardInstanceItemType } from '../../types'
import {
  storeItemImage,
  getItemImageFromStorage
} from '../../logic/local-storage'
import { useTranslation } from 'react-i18next'
import ButtonPane from '../Infrastructure/ButtonPane'
import { Box, Button } from '@mui/material'

export interface DidItPageProps {
  item: BoardInstanceItemType
  onClose: (done: boolean) => void
}

export default function DidItPage (props: DidItPageProps): ReactElement {
  const [imageData, setImageData] = useState<string | undefined>()
  const { item, onClose } = props
  const { t } = useTranslation()

  const onFileChange = (event: any): void => {
    const file = event.target.files?.[0]
    if (file != null) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64Data = reader.result?.toString()
        setImageData(base64Data)
        storeItemImage(base64Data ?? '', item.id)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    const data = getItemImageFromStorage(item.id)
    if (data != null) {
      setImageData(data)
    }
  }, [])

  const onSave = (): void => {
    // uploadFile()
    onClose(true)
  }

  const onCancel = (): void => {
    onClose(false)
  }

  return (
    <>
      <Box sx={{ margin: '30px', textAlign: 'left' }}>
        <h4>Way to go!</h4>
        <p>You have experienced: {t(item.id)}</p>
        <p>Add a selfie or an take a photo of your experience</p>
        <div>
          <Button variant="contained" component="label" onChange={onFileChange}>
            Upload File
            <input type="file" hidden />
          </Button>
          {imageData != null && <img id="experience-photo" src={imageData} />}
        </div>
      </Box>
      <ButtonPane
        backText={t('did_it_button_back')}
        onBack={onCancel}
        nextText={t('did_it_button_next')}
        onNext={onSave}
      />
    </>
  )
}
