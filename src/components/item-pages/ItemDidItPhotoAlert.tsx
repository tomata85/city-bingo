import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

export interface ItemDidItPhotoAlertProps {
  onClose: (skipPhoto: boolean) => void
}

export default function ItemDidItPhotoAlert (props: ItemDidItPhotoAlertProps) {
  const [open, setOpen] = useState(true)

  const handleClose = (forcePhoto: boolean) => {
    setOpen(false)
    props.onClose(forcePhoto)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to skip uploading a photo of your experience?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => {
            handleClose(true)
          }}
        >
          Skip photo
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            handleClose(false)
          }}
          autoFocus
        >
          Back to page
        </Button>
      </DialogActions>
    </Dialog>
  )
}
