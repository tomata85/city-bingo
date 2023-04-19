import './styles.css'
import React, { useState, type ReactElement } from 'react'
import AWS from 'aws-sdk'
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY_ID } from '../SECRETS'
import { BoardItemType } from '../types'

export interface FileProps {
  name: string
}

const S3_BUCKET = 'city-bingo-storage'
const REGION = 'ap-northeast-1'

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY_ID
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION
})

export interface DidItPageProps {
  item: BoardItemType
  onClose: (done: boolean) => void
}

export default function DidItPage (props: DidItPageProps): ReactElement {
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState<FileProps>()

  const onFileChange = (event: any): void => {
    setFile(event.target.files[0])
  }

  const uploadFile = (): void => {
    if (file != null) {
      console.log(file)

      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
      }

      myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
          if (err != null) console.log(err)
        })
    }
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
      <input type="file" onChange={onFileChange} />
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSave}>Save</button>
    </div>
    </>)
}
