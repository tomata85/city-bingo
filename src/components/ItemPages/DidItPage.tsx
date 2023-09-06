import React, { useState, type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import FooterPane from '../Infrastructure/FooterPane'
import { Box, Button, Rating, TextField } from '@mui/material'
import Resizer from 'react-image-file-resizer'
import { ItemPagesProps } from './ItemPagesContainer'
import FooterPaneButton from '../Infrastructure/FooterPaneButton'
import { uploadItemImage } from '../../logic/api'

export default function DidItPage (props: ItemPagesProps): ReactElement {
  const [imagePreviewBlob, setImagePreviewBlob] = useState<Blob | undefined>()
  const [rating, setRating] = useState<number>(0)
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

  const onSave = (): void => {
    const uploadImageUrl = async () => {
      if (imagePreviewBlob != null) {
        const imageUrl = await uploadItemImage(item.id, imagePreviewBlob)
        onClose(true, imageUrl)
      }
    }

    void uploadImageUrl()
  }

  const onCancel = (): void => {
    onClose(false)
  }

  const onImageCompressed = (imageBlob: any): void => {
    setImagePreviewBlob(imageBlob)
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
        <TextField
          sx={{
            width: '100%'
          }}
          id="outlined-basic"
          label={t('did_it_review_placeholder')}
          variant="outlined"
          multiline
          rows={4}
        />
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => { setRating(newValue ?? 0) }}
        />
        <p>{t('did_it_selfie')}</p>
        <div>
          <Button variant="contained" component="label" onChange={onFileChange}>
            {t('did_it_browse_file')}
            <input type="file" hidden />
          </Button>
          {imagePreviewBlob != null && (
            <Box
              sx={{
                mt: '20px'
              }}
            >
              <img
                id="experience-photo"
                src={URL.createObjectURL(imagePreviewBlob)}
              />
            </Box>
          )}
        </div>
      </Box>
      <FooterPane>
        <FooterPaneButton text={t('did_it_close')} onClick={onCancel} />
        <FooterPaneButton
          text={
            imagePreviewBlob != null
              ? t('did_it_next')
              : t('did_it_next_no_image')
          }
          onClick={onSave}
        />
      </FooterPane>
    </>
  )
}
