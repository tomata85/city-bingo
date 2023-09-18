import React, { useState, type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Rating,
  TextField,
  Typography,
  styled
} from '@mui/material'
import Resizer from 'react-image-file-resizer'
import { ItemPagesProps } from './ItemPagesContainer'
import { uploadItemImage } from '../../io/aws-lambdas'
import { updateBoardItem } from '../../logic/board'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export default function DidItPage (props: ItemPagesProps): ReactElement {
  const [imagePreviewBlob, setImagePreviewBlob] = useState<Blob | undefined>()
  const [review, setReview] = useState<string>('')
  const [rating, setRating] = useState<number>(0)
  const [canSave, setCanSave] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
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
    setSaving(true)
    const uploadImageUrl = async () => {
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

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75' // RED-ish
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47'
    }
  })

  return (
    <>
      <Box>
        <Typography
          component="div"
          sx={{ flexGrow: 1, mt: '10px' }}
        >
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
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label={t('did_it_review_placeholder')}
          variant="outlined"
          multiline
          rows={2}
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
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" sx={{ mt: '45px' }}>
        <Button
          variant="contained"
          disabled={!canSave}
          onClick={onSave}
          size="large"
          sx={{ width: '100%' }}
          type="submit"
        >
          {saving
            ? (
            <CircularProgress color="secondary" />
              )
            : (
                t('did_it_close')
              )}
        </Button>
      </Box>
    </>
  )
}
