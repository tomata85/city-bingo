import React, { useState, type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Rating,
  TextField
} from '@mui/material'
import Resizer from 'react-image-file-resizer'
import { ItemPagesProps } from './ItemPagesContainer'
import { uploadItemImage } from '../../logic/api'
import FooterPane from '../Infrastructure/FooterPane'
import FooterPaneButton from '../Infrastructure/FooterPaneButton'

export default function DidItPage (props: ItemPagesProps): ReactElement {
  const [imagePreviewBlob, setImagePreviewBlob] = useState<Blob | undefined>()
  const [rating, setRating] = useState<number>(0)
  const [canSave, setCanSave] = useState<boolean>(false)
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
      } else {
        onClose(true)
      }
    }

    void uploadImageUrl()
  }

  const onImageCompressed = (imageBlob: any): void => {
    setImagePreviewBlob(imageBlob)
    setCanSave(true)
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

  const onSkipChanged = (event: any, value: boolean) => {
    if (!value && imagePreviewBlob === undefined) {
      setCanSave(false)
    } else {
      setCanSave(true)
    }
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
          onChange={(event, val) => {
            setRating(val ?? 0)
          }}
        />
        <p>{t('did_it_selfie')}</p>
        <div>
          <Button variant="contained" component="label" onChange={onFileChange}>
            {t('did_it_browse_file')}
            <input type="file" hidden />
          </Button>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={onSkipChanged} />}
              label={t('did_it_next_skip_selfie')}
            />
          </FormGroup>
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
          <FooterPane>
            <FooterPaneButton text={t('did_it_save')} onClick={onSave} disabled={!canSave} />
          </FooterPane>
        </div>
      </Box>
    </>
  )
}
