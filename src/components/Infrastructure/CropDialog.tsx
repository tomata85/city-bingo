import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { ReactElement, useRef } from 'react'
import { Cropper, ReactCropperElement } from 'react-cropper'

export interface CropDialogProps {
  imageUrl: string
  open: boolean
  handleClose: (croppedImageUrl: string) => void
}

export function CropDialog (props: CropDialogProps): ReactElement {
  const { open, imageUrl, handleClose } = props
  const cropperRef = useRef<ReactCropperElement>(null)
  const onClose = () => {
    const cropper = cropperRef.current?.cropper
    handleClose(cropper!.getCroppedCanvas().toDataURL())
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          // color="secondary"
          // size="small"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
