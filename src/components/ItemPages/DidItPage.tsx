import React, { useState, type ReactElement, useEffect } from 'react'
import {
  storeItemImage,
  getItemImageFromStorage
} from '../../logic/local-storage'
import { useTranslation } from 'react-i18next'
import FooterPane from '../Infrastructure/FooterPane'
import { Box, Button } from '@mui/material'
import Resizer from 'react-image-file-resizer'
import { ItemPagesProps, ShownPageType } from './ItemPagesContainer'
import FooterPaneButton from '../Infrastructure/FooterPaneButton'
import { uploadFile } from '../../logic/api'

export default function DidItPage (props: ItemPagesProps): ReactElement {
  const [imageData, setImageData] = useState<string | undefined>()
  const { item, onClose, onChangePage } = props
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
    uploadFile('fff')
    onClose(true)
  }

  const onCancel = (): void => {
    onClose(false)
  }

  const onBack = (): void => {
    onChangePage(ShownPageType.Information)
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
      onImageCompressed,
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
            <Box
              sx={{
                mt: '20px'
              }}
            >
              <img id="experience-photo" src={imageData} />
            </Box>
          )}
        </div>
      </Box>
      <FooterPane>
        <FooterPaneButton text={t('did_it_button_back')} onClick={onCancel} />
        <FooterPaneButton text="Back" onClick={onBack} />
        <FooterPaneButton
          text={
            imageData != null
              ? t('did_it_button_next')
              : t('did_it_button_next_no_image')
          }
          onClick={onSave}
        />
      </FooterPane>
    </>
  )
}
