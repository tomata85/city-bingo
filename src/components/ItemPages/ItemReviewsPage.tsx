import React, { ReactElement } from 'react'
import { ItemPagesProps } from './ItemPagesContainer'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'

export default function ItemReviewsPage (props: ItemPagesProps): ReactElement {
  const { t } = useTranslation()

  return (
  <Box>
    {t('reviews_soon')}
  </Box>)
}
