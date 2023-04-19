import './styles.css'
import React, { useState, type ReactElement } from 'react'
import { BoardItemType, PhotoProps } from '../types'

export interface DidItPageProps {
  item: BoardItemType
  onClose: (done: boolean) => void
}

export default function DidItPage (props: DidItPageProps): ReactElement {
  const [photo, setPhoto] = useState<PhotoProps>()

  const onFileChange = (event: any): void => {
    const newPhoto = {
      name: event.target.files[0],
      media: URL.createObjectURL(event.target.files[0])
    }
    setPhoto(newPhoto)
  }

  const onSave = (): void => {
    // uploadFile()
    props.onClose(true)
  }

  const onCancel = (): void => {
    props.onClose(false)
  }

  return (
    <>
      <h1 className="title">Way to go!</h1>
      <p>You have experienced: {props.item.text}</p>
      <p>Add a selfie or an take a photo of your experience</p>
      <div>
      <input accept="image/*" type="file" onChange={onFileChange} />
      {photo !== null && <img id="experience-photo" src={photo?.media} />}
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSave}>Save</button>
    </div>
    </>)
}
