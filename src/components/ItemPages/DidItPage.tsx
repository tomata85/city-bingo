import React, { useState, type ReactElement, useEffect } from 'react'
import { BoardInstanceItemType } from '../../types'
import {
  storeItemImage,
  getItemImageFromStorage
} from '../../logic/local-storage'
import { useTranslation } from 'react-i18next'
import ButtonPane from '../Infrastructure/ButtonPane'
import { Box, Button } from '@mui/material'
import Resizer from 'react-image-file-resizer'

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
        compressImage(file)
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

  const onImageCompressed = (image: any): void => {
    setImageData(image)
    storeItemImage(image ?? '', item.id)
  }

  const compressImage = (data: any): void => {
    Resizer.imageFileResizer(
      data,
      300,
      300,
      'JPEG',
      100,
      0,
      onImageCompressed, // Is the callBack function of the resized new image URI.
      'base64'
    )
  }

  return (
    <>
      <Box sx={{ margin: '30px', textAlign: 'left' }}>
        <h3>{t('did_it_title')}</h3>
        <p>{t('did_it_selfie')}</p>
        <div>
          <Button variant="contained" component="label" onChange={onFileChange}>
            {t('did_it_browse_file')}
            <input type="file" hidden />
          </Button>
          {imageData != null && (
            <Box sx={{
              mt: '20px'
            }}>
              <img id="experience-photo" src={imageData} />
            </Box>
          )}
        </div>
      </Box>
      <ButtonPane
        backText={t('did_it_button_back')}
        onBack={onCancel}
        nextText={(imageData != null) ? t('did_it_button_next') : t('did_it_button_next_no_image') }
        onNext={onSave}
      />
    </>
  )
}
