import { BoardInstanceType, DESTINATION_ID } from '../types'

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const BASE_URL = 'https://19iqaec2c8.execute-api.eu-west-1.amazonaws.com/default'

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
  destination = DESTINATION_ID): Promise<BoardInstanceType | undefined> {
  const response = await call(
    `${BASE_URL}/getUser?userId=${userId}&destination=${destination}`,
    requestOptions('GET'))

  const jsonResponse = await response.json()

  if (Object.keys(jsonResponse).length > 0) {
    return jsonResponse
  } return undefined
}

export async function uploadItemImage (itemId: string, photo: Blob) {
  // TODO use call?
  const res = await fetch(
      `${BASE_URL}/getImageUploadLink?itemId=${itemId}`,
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

export async function updateBoardInstanceInDB (userId: string, boardInstance: BoardInstanceType) {
  const requestData: any = {
    id: userId
  }
  requestData[`boardInstance_${DESTINATION_ID}`] = boardInstance
  // TODO: Rename Lambda?
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  await call(`${BASE_URL}/checkItem`, requestOptions('POST', requestData))
}

export async function getPlaceDetails (placeId: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/getGoogleMapPlaces?placeId=${placeId}`,
      requestOptions('GET'))

    const placeDetails = await res.json()
    return placeDetails
  } catch (error) {
    console.error('Error:', error)
  }
}
