import { GOOGLE_API_KEY } from '../SECRETS'

const pirin75PlaceID = 'ChIJZU6cxXqvqxQRwxq3rl8QYAA'
const BASE_URL = 'https://maps.googleapis.com/maps/api/place/details/json'

function requestOptions (method: string) {
  const headers = {
    method,
    headers: { 'Content-Type': 'application/json' }
  }

  return headers
}

export async function getImage () {
  try {
    const response = await fetch(
    `${BASE_URL}?place_id=${pirin75PlaceID}&fields=name,photos&key=${GOOGLE_API_KEY}`,
    requestOptions('GET')
    )

    console.log(response)
  } catch (error) {
    console.error('Error:', error)
  }
}
