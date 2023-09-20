import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { ReactElement, useRef } from 'react'
import { Cropper, ReactCropperElement } from 'react-cropper'

export interface CropDialogProps {
  imageUrl: string
  open: boolean
  handleClose: (croppedImage: Blob | null) => void
}

export function CropDialog (props: CropDialogProps): ReactElement {
  const { open, imageUrl, handleClose } = props
  const cropperRef = useRef<ReactCropperElement>(null)
  const onClose = () => {
    const cropper = cropperRef.current?.cropper
    cropper!.getCroppedCanvas().toBlob((blob) => {
      handleClose(blob)
    })
  }
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Crop your photo</DialogTitle>
      <DialogContent>
        <Cropper
          src={imageUrl}
          // style={{ height: '350px', width: '100%' }}
          aspectRatio={1}
          guides={false}
          ref={cropperRef}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
