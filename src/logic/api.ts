import { BoardInstanceType, PhotoProps } from '../types'

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const url = 'https://19iqaec2c8.execute-api.eu-west-1.amazonaws.com/default'

function requestOptions (method: string, body?: any) {
  const headers = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }

  return headers
}

export function uploadFile (photo: any) {
  fetch(`${url}/getImageUploadLink`, requestOptions('GET'))
    .then(async res => await res.json())
    .then(signedUrl => {
      console.log(signedUrl)

      if (signedUrl == null) {
        return
      }

      call(signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg'
        },
        body: 'Hayoosh'// photo.media
      }).catch((err) => {
        console.log(err.message)
      })
    }).catch((err) => {
      console.log(err.message)
    })
}

async function call (url: string, requestOptions: any): Promise<any> {
  return await fetch(url, requestOptions)
    .catch((err) => {
      console.log(err.message)
    })
}

export function updateBoardInstance (boardInstance: BoardInstanceType) {
  // TODO: Rename Lambda?
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  call(`${url}/checkItem`, requestOptions('POST', {
    id: 'talya.stern@gmail.com',
    boardInstance_bansko: boardInstance
  }))
}
