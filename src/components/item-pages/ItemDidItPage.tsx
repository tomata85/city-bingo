import React, { useState, type ReactElement, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  CircularProgress,
  Rating,
  TextField,
  Typography,
  styled
} from '@mui/material'
import { ItemPagesProps } from './ItemPagesContainer'
import { uploadItemImage } from '../../io/aws-lambdas'
import { updateBoardItem } from '../../logic/board'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ItemDidItPhotoAlert from './ItemDidItPhotoAlert'
import { compressImage } from '../../logic/images'
import 'cropperjs/dist/cropper.css'
import { CropDialog } from '../infrastructure/CropDialog'

export default function DidItPage (props: ItemPagesProps): ReactElement {
  const { item, onClose } = props

  const [imagePreviewBlob, setImagePreviewBlob] = useState<Blob | undefined>()
  const [review, setReview] = useState<string>('')
  const [rating, setRating] = useState<number>(0)

  const [skipPhoto, setSkipPhoto] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [showCropDialog, setShowCropDialog] = useState<boolean>(false)
  const [cropImageUrl, setCropImageUrl] = useState<string>('')
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('')
  const { t } = useTranslation()

  const onSave = (): void => {
    setSaving(true)

    const canSave = imagePreviewBlob != null || skipPhoto
    if (canSave) {
      const save = async () => {
        let updatedItem = item
        let imageUrl
        if (imagePreviewBlob != null) {
          imageUrl = await uploadItemImage(item.id, imagePreviewBlob)
        }
        updatedItem = updateBoardItem(item, {
          checked: true,
          rating,
          review,
          imageUrl
        })
        onClose(updatedItem)
      }

      void save()
    } else {
      setShowDialog(true)
    }
  }

  useEffect(() => {
    if (saving) {
      onSave()
    }
  }, [skipPhoto])

  const onCloseSkipPhotoDialog = (skipPhoto: boolean) => {
    setShowDialog(false)

    if (skipPhoto) {
      setSkipPhoto(true)
    } else {
      setSaving(false)
    }
  }

  const onFileChange = (event: any): void => {
    const file = event.target.files?.[0]
    if (file != null) {
      const reader = new FileReader()
      reader.onload = () => {
        setCropImageUrl(URL.createObjectURL(file))
        setShowCropDialog(true)
        // compressImage(file, onImageCompressed)
      }
      reader.readAsDataURL(file)
    }
  }

  const onImageCompressed = (imageBlob: Blob): void => {
    setImagePreviewBlob(imageBlob)
    setSkipPhoto(true)
  }

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75' // RED-ish
    }
  })

  const handleCropClose = (url: string) => {
    setShowCropDialog(false)
    setImagePreviewUrl(url)
  }

  return (
    <>
      <Box>
        <Typography component="div" sx={{ flexGrow: 1, mt: '10px' }}>
          {t('did_it_title')}
        </Typography>
        <StyledRating
          sx={{ mt: '10px' }}
          name="simple-controlled"
          value={rating}
          onChange={(_, val) => {
            setRating(val ?? 0)
          }}
          color="primary"
          icon={<FavoriteIcon fontSize="large" />}
          emptyIcon={<FavoriteBorderIcon fontSize="large" />}
        />
        <TextField
          sx={{ mt: '15px' }}
          fullWidth
          color="secondary"
          id="outlined-basic"
          label={t('did_it_review_placeholder')}
          variant="outlined"
          multiline
          value={review}
          onChange={(event) => {
            setReview(event.target.value)
          }}
        />
        <p>{t('did_it_selfie')}</p>
        <Box>
          <Button variant="contained" component="label" onChange={onFileChange}>
            {t('did_it_browse_file')}
            <input type="file" hidden />
          </Button>
          <CropDialog open={showCropDialog} imageUrl={cropImageUrl} handleClose={handleCropClose} />
          {imagePreviewUrl != null && (
            <Box
              sx={{
                mt: '20px'
              }}
            >
              <img
                id="experience-photo"
                src={imagePreviewUrl}
                style={{ borderRadius: '8px' }}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" sx={{ mt: '15px' }}>
        <Button
          variant="contained"
          onClick={onSave}
          size="large"
          sx={{ width: '100%' }}
          type="submit"
        >
          {saving ? <CircularProgress color="secondary" /> : t('did_it_close')}
        </Button>
      </Box>
      {showDialog && <ItemDidItPhotoAlert onClose={onCloseSkipPhotoDialog} />}
    </>
  )
}
