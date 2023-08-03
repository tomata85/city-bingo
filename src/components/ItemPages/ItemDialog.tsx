import React, { type ReactElement } from 'react'
import { BoardInstanceItemType } from '../../types'
import DidItPage from './DidItPage'
import { Dialog, DialogTitle } from '@mui/material'
import { useTranslation } from 'react-i18next'

export interface ItemDialogProps {
  item: BoardInstanceItemType
  onClose: (done: boolean) => void
}

export default function ItemDialog (props: ItemDialogProps): ReactElement {
  const { item, onClose } = props
  const { t } = useTranslation()

  return (
    <Dialog onClose={onClose} open={true}>
      <DialogTitle>{t(item.id)}</DialogTitle>
    </Dialog>
  // <DidItPage {...props}/>
  )
}
