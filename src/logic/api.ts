import { BoardInstanceType } from '../types'

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

export async function getBoardFromDB (
  userId: string,
  destination = 'bansko'): Promise<BoardInstanceType | undefined> {
  const response = await call(
    `${url}/getUser?userId=${userId}&destination=${destination}`,
    requestOptions('GET'))

  const jsonResponse = await response.json()

  if (Object.keys(jsonResponse).length > 0) {
    return jsonResponse
  } return undefined
}

export async function uploadItemImage (itemId: string, photo: Blob) {
  // TODO use call?
  const res = await fetch(
      `${url}/getImageUploadLink?itemId=${itemId}`,
      requestOptions('GET'))

  // Upload Image
  const signedUrl = await res.json()
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/jpeg'
    },
    body: photo
  }
  await call(signedUrl, options)

  // Return URL
  const photoUrl = signedUrl.split('?')[0]
  return photoUrl
}

async function call (url: string, requestOptions: any): Promise<any> {
  return await fetch(url, requestOptions)
}

export function updateBoardInstance (userId: string, boardInstance: BoardInstanceType) {
  // TODO: Rename Lambda?
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  call(`${url}/checkItem`, requestOptions('POST', {
    id: userId,
    boardInstance_bansko: boardInstance
  }))
}
