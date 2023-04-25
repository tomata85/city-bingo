import './styles.css'
import React, { useState, type ReactElement, useEffect } from 'react'
import { BoardItemType, PhotoProps } from '../types'

export interface DidItPageProps {
  item: BoardItemType
  onClose: (done: boolean, photo: any) => void
}

export default function DidItPage (props: DidItPageProps): ReactElement {
  const [photo, setPhoto] = useState<PhotoProps>()
  const [photoPreview, setPhotoPreview] = useState<string>()

  const onFileChange = (event: any): void => {
    const newPhoto = {
      name: event.target.files[0].name,
      media: event.target.files[0]
    }
    setPhoto(newPhoto)
  }

  useEffect(() => {
    if (photo == null || photo === undefined) {
      setPhotoPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(photo.media)
    setPhotoPreview(objectUrl)

    return () => { URL.revokeObjectURL(objectUrl) }
  }, [photo])

  const onSave = (): void => {
    // uploadFile()
    props.onClose(true, photo)
  }

  const onCancel = (): void => {
    props.onClose(false, undefined)
  }

  return (
    <>
      <h1 className="title">Way to go!</h1>
      <p>You have experienced: {props.item.text}</p>
      <p>Add a selfie or an take a photo of your experience</p>
      <div>
      <input accept="image/*" type="file" onChange={onFileChange} />
      {(photoPreview != null) && <img id="experience-photo" src={photoPreview} />}
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSave}>Save</button>
    </div>
    </>)
}
