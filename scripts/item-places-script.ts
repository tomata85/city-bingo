import { writeFileSync } from 'fs'
import * as https from 'https'

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const BASE_URL = 'https://19iqaec2c8.execute-api.eu-west-1.amazonaws.com/default'

export const ITEM_PLACES = {
  item_g: [
    // Snug Cafe
    'ChIJm5RpBEyvqxQR-gheH8LfSZM',
    // Vintage
    'ChIJqSGnCPuvqxQROvEQxQhsLTc',
    // Cafe Retro
    'ChIJLWX7aKOuqxQRRQUC71C0ri4',
    // Le Petite Nicholas
    'ChIJHY6LYKKuqxQRuN1P3moLawA',
    // French Guy
    'ChIJg0aZGPqvqxQRvnChs7DttJo'
  ],
  item_h: [
    'ChIJQcjFOjqsqxQRadxHlO8Wzw0',
    'ChIJP0rfCFOvqxQRDBL0FnMus80'
  ],
  item_a: [
    'ChIJOzPghfhRpEARDQTKL1t2t7A',
    'ChIJq6qqqlqoqxQR7YoSEV8YGpA',
    'ChIJZztZS1mvqxQR27eeUF_o7Dk',
    'ChIJKQSQp1apqxQRQWeTIPEnQxA',
    'ChIJm0c-S5CnqxQRvYI3rBHsZsU'
  ]
}

export function getPlaceDetails (itemId: string, placeId: string) {
  // try {
  https.get(`${BASE_URL}/getGoogleMapPlaces?placeId=${placeId}`, (res) => {
    let data = ''

    // A chunk of data has been received.
    res.on('data', (chunk) => {
      data = data.concat(chunk)
    })

    // The whole response has been received.
    res.on('end', () => {
      const placeObject = Object.assign(
        JSON.parse(data),
        { itemId },
        { placeId })
      console.log(placeObject)
    })
  }).on('error', (err) => {
    console.log('Error: ' + err.message)
  })
}

export function main () {
  console.log('Starting item places script...')
  // const mockData = { x: 'y' }
  // writeFileSync('./item-places-details.ts', JSON.stringify(mockData), {
  //   flag: 'w'
  // })

  Object.entries(ITEM_PLACES).map(async ([itemId, placesList]) => {
    placesList.map(async (placeId) => {
      getPlaceDetails(itemId, placeId)
    })
  })
  console.log('Finished item places script.')
}

main()
