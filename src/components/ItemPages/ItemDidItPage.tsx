import React, { useState, type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Rating,
  TextField,
  Typography
} from '@mui/material'
import Resizer from 'react-image-file-resizer'
import { ItemPagesProps } from './ItemPagesContainer'
import { uploadItemImage } from '../../io/aws-lambdas'
import FooterPane from '../Infrastructure/FooterPane'
import FooterPaneButton from '../Infrastructure/FooterPaneButton'
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

  return (
    <>
      <Box>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, mt: '5px' }}
        >
          {t('did_it_title')}
        </Typography>
        <TextField
          fullWidth
          id="outlined-basic"
          label={t('did_it_review_placeholder')}
          variant="outlined"
          multiline
          rows={4}
          value={review}
          onChange={(event) => {
            setReview(event.target.value)
          }}
        />
        <Rating
          sx={{ mt: '5px' }}
          name="simple-controlled"
          value={rating}
          onChange={(event, val) => {
            setRating(val ?? 0)
          }}
          color="primary"
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
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
          <FooterPane>
            <FooterPaneButton
              text={t('did_it_save')}
              onClick={onSave}
              disabled={!canSave}
              progress={saving}
            />
          </FooterPane>
        </Box>
      </Box>
    </>
  )
}
