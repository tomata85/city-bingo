import React, { ReactElement } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Rating, styled } from '@mui/material'
import { COLOR_REDISH } from '../../App'

export interface ItemRatingProps {
  rating: number | null
  readOnly?: boolean
  onChange?: (val: number | null) => void
  small?: boolean
}

export default function ItemRating (props: ItemRatingProps): ReactElement {
  const { rating, readOnly = false, onChange, small = false } = props
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: COLOR_REDISH
    }
  })

  let style = {}
  if (small) {
    style = {
      fontSize: '18px'
    }
  }
  const emptyIcon = readOnly ? <></> : <FavoriteBorderIcon sx={style}/>
  return (
    <StyledRating
      name="simple-controlled"
      value={rating}
      readOnly={readOnly}
      onChange={(_, val) => {
        if (onChange != null) onChange(val)
      }}
      color="primary"
      icon={<FavoriteIcon sx={style} />}
      emptyIcon={emptyIcon}
    />
  )
}
