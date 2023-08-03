import React, { type ReactElement } from 'react'
import { BoardInstanceItemType } from '../../types'
import DidItPage from './DidItPage'

export interface ItemDialogProps {
  item: BoardInstanceItemType
  onClose: (done: boolean) => void
}

export default function ItemDialog (props: ItemDialogProps): ReactElement {
  return <DidItPage {...props}/>
}
