import '../styles.css'
import React, { useState, type ReactElement, useEffect } from 'react'
import { BoardInstanceItemType } from '../../types'
import { storeItemImage, getItemImageFromStorage } from '../../logic/local-storage'
import { useTranslation } from 'react-i18next'

export interface DidItPageProps {
  item: BoardInstanceItemType
  onClose: (done: boolean) => void
}

export default function DidItPage (props: DidItPageProps): ReactElement {
  const [imageData, setImageData] = useState<string | undefined>()
  const { item, onClose } = props
  const { t } = useTranslation()

  const onFileChange = (event: any): void => {
    const file = event.target.files?.[0]
    if (file != null) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64Data = reader.result?.toString()
        setImageData(base64Data)
        storeItemImage(base64Data ?? '', item.id)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    const data = getItemImageFromStorage(item.id)
    if (data != null) {
      setImageData(data)
    }
  }, [])

  const onSave = (): void => {
    // uploadFile()
    onClose(true)
  }

  const onCancel = (): void => {
    onClose(false)
  }

  return (
    <>
      <h1 className="title">Way to go!</h1>
      <p>You have experienced: {t(item.id)}</p>
      <p>Add a selfie or an take a photo of your experience</p>
      <div>
      <input accept="image/*" type="file" onChange={onFileChange} />
      {(imageData != null) && <img id="experience-photo" src={imageData} />}
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSave}>Save</button>
    </div>
    </>)
}
