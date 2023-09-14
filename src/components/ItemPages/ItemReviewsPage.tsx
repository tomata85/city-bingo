import React, { ReactElement } from 'react'
import { ItemPagesProps } from './ItemPagesContainer'
import { useTranslation } from 'react-i18next'
import InformationBox from '../Infrastructure/InformationBox'

export default function ItemReviewsPage (props: ItemPagesProps): ReactElement {
  const { t } = useTranslation()

  return <InformationBox text={t('reviews_soon')} showCloseButton={false} />
}
