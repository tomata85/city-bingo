import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY_ID } from '../SECRETS'
import AWS from 'aws-sdk'
import { PhotoProps } from '../types'

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

export const uploadFile = (photo: PhotoProps): void => {
  if (photo != null) {
    const params = {
      ACL: 'public-read',
      Body: photo.media,
      Bucket: S3_BUCKET,
      Key: photo.name
    }

    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        // setProgress(Math.round((evt.loaded / evt.total) * 100))
      })
      .send((err) => {
        if (err != null) console.log(err)
      })
  }
}
