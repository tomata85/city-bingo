import './styles.css'
import React, { useState, type ReactElement } from 'react'
import AWS from 'aws-sdk'

export interface FileProps {
  name: string
}

const S3_BUCKET = 'city-bingo-storage'
const REGION = 'ap-northeast-1'

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION
})

export default function DidItPage (): ReactElement {
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState<FileProps>()

  const onFileChange = (event: any): void => {
    setFile(event.target.files[0])
  }

  const onFileUpload = (): void => {
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

  return (
    <>
      <div>
      <div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>
          Upload!
        </button>
    </div>
    </>)
}
