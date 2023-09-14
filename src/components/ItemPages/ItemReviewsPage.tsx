import React, { ReactElement } from 'react'
import { ItemPagesProps } from './ItemPagesContainer'
import { useTranslation } from 'react-i18next'
import InformationBox from '../Infrastructure/InformationBox'
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
            sx={{ flexGrow: 1, mt: '5px' }}
          >
            {t('reviews_your_experience')}
          </Typography>
          <TextField
            sx={{
              width: '100%'
            }}
            id="outlined-basic"
            label={t('did_it_review_placeholder')}
            variant="outlined"
            multiline
            rows={4}
            InputProps={{
              readOnly: true
            }}
          />
          <Rating
            sx={{ mt: '5px' }}
            name="simple-controlled"
            value={4}
            readOnly={true}
            color="primary"
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
        </Box>
      )}
    </>
  )
}
