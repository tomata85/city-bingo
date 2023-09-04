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
import { uploadItemImage } from '../../logic/api'

export default function DidItPage (props: ItemPagesProps): ReactElement {
  const [imageBlob, setImageBlob] = useState<Blob | undefined>()
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

  async function loadPhotoFromUrl (photoUrl: string) {
    const options = {
      method: 'GET'
    }
    const response = await fetch(photoUrl, options)

    if (response.status === 200) {
      const fetchedImageBlob = await response.blob()
      setImageBlob(fetchedImageBlob)
    } else {
      console.log(response)
    }
  }

  useEffect(() => {
    const getPhoto = async () => {
      const photoUrl = getItemImageFromStorage(item.id)
      if (photoUrl != null) {
        await loadPhotoFromUrl(photoUrl)
      }
    }

    void getPhoto()
  }, [])

  const onSave = (): void => {
    if (imageBlob != null) {
      uploadItemImage(item.id, imageBlob, onImageUploaded)
    }
  }

  const onImageUploaded = (imageUrl: string): void => {
    storeItemImage(item.id, imageUrl)
    onClose(true)
  }

  const onCancel = (): void => {
    onClose(false)
  }

  const onBack = (): void => {
    onChangePage(ShownPageType.Information)
  }

  const onImageCompressed = (imageBlob: any): void => {
    setImageBlob(imageBlob)
  }

  const compressImage = (data: any): void => {
    Resizer.imageFileResizer(
      data,
      1000,
      1000,
      'JPEG',
      100,
      0,
      onImageCompressed,
      'blob'
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
          {imageBlob != null && (
            <Box
              sx={{
                mt: '20px'
              }}
            >
              <img id="experience-photo" src={URL.createObjectURL(imageBlob)} />
            </Box>
          )}
        </div>
      </Box>
      <FooterPane>
        <FooterPaneButton text={t('did_it_button_back')} onClick={onCancel} />
        <FooterPaneButton text="Back" onClick={onBack} />
        <FooterPaneButton
          text={
            imageBlob != null
              ? t('did_it_button_next')
              : t('did_it_button_next_no_image')
          }
          onClick={onSave}
        />
      </FooterPane>
    </>
  )
}
