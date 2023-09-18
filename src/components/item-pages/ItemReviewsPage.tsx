import React, { ReactElement } from 'react'
import { ItemPagesProps } from './ItemPagesContainer'
import { useTranslation } from 'react-i18next'
import InformationBox from '../infrastructure/InformationBox'
import { Box } from '@mui/system'
import { Rating, TextField, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export default function ItemReviewsPage (props: ItemPagesProps): ReactElement {
  const { item } = props
  const { t } = useTranslation()

  return (
    <>
      <InformationBox text={t('reviews_soon')} showCloseButton={false} />
      {item.checked && (
        <Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, mt: '10px' }}
          >
            {t('reviews_your_experience')}
          </Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            InputProps={{
              readOnly: true
            }}
            value={item.review}
          />
          <Rating
            sx={{ mt: '5px' }}
            name="simple-controlled"
            value={item.rating}
            readOnly={true}
            color="primary"
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
          {item.imageUrl != null && (
            <Box
              sx={{
                mt: '20px'
              }}
            >
              <img
                id="experience-photo"
                src={item.imageUrl}
              />
            </Box>
          )}
        </Box>
      )}
    </>
  )
}
