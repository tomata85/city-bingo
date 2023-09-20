import React, { useState, type ReactElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  Rating,
  Typography,
  styled
} from '@mui/material'
import { ItemPagesProps } from './ItemPagesContainer'
import { uploadItemImage } from '../../io/aws-lambdas'
import { updateBoardItem } from '../../logic/board'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ItemDidItPhotoAlert from './ItemDidItPhotoAlert'
import 'cropperjs/dist/cropper.css'
import { CropDialog } from '../infrastructure/CropDialog'
import { compressImage } from '../../logic/images'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { COLOT_REDISH } from '../../App'

export default function DidItPage (props: ItemPagesProps): ReactElement {
  const { item, onClose } = props
  const [rating, setRating] = useState<number>(0)

  const [cropImageUrl, setCropImageUrl] = useState<string>('')
  const [imagePreviewBlob, setImagePreviewBlob] = useState<Blob | undefined>()

  const [skipPhoto, setSkipPhoto] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [showCropDialog, setShowCropDialog] = useState<boolean>(false)

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
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropClose = (blob: Blob | null) => {
    setShowCropDialog(false)
    if (blob != null) {
      compressImage(blob, onImageCompressed)
    }
  }

  const onImageCompressed = (imageBlob: Blob): void => {
    setImagePreviewBlob(imageBlob)
  }

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: COLOT_REDISH
    }
  })

  return (
    <>
      <Box>
        <Box>
          <Typography sx={{ my: '10px' }} variant="body2">
            {t('did_it_selfie')}
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              component="label"
              onChange={onFileChange}
              startIcon={<AddPhotoAlternateOutlinedIcon />}
            >
              {t('did_it_browse_file')}
              <input type="file" hidden />
            </Button>
          </Box>
          <CropDialog
            open={showCropDialog}
            imageUrl={cropImageUrl}
            handleClose={handleCropClose}
          />
          {imagePreviewBlob != null && (
            <Box
              sx={{
                mt: '20px'
              }}
              display="flex"
              justifyContent="center"
            >
              <img
                src={URL.createObjectURL(imagePreviewBlob)}
                style={{ borderRadius: '8px', maxWidth: '60%' }}
              />
            </Box>
          )}
        </Box>
        <Typography
          variant="body2"
          component="div"
          sx={{ flexGrow: 1, mt: '20px' }}
        >
          {t('did_it_title')}
        </Typography>
        <Box display="flex" justifyContent="center">
          <StyledRating
            sx={{ mt: '15px' }}
            name="simple-controlled"
            value={rating}
            onChange={(_, val) => {
              setRating(val ?? 0)
            }}
            color="primary"
            icon={<FavoriteIcon fontSize="large" />}
            emptyIcon={<FavoriteBorderIcon />}
          />
        </Box>

      </Box>
      <Fab
        sx={{
          m: 0,
          top: 'auto',
          right: 'auto',
          bottom: 70,
          left: 'auto',
          position: 'fixed',
          width: '90%'
        }}
        size="large"
        color="primary"
        variant="extended"
        onClick={onSave}
      >
        {saving
          ? (
          <CircularProgress color="secondary" />
            )
          : (
          <>
            <CheckCircleIcon sx={{ mr: 1 }} />
            {t('did_it_save')}
          </>
            )}
      </Fab>
      {showDialog && <ItemDidItPhotoAlert onClose={onCloseSkipPhotoDialog} />}
    </>
  )
}
