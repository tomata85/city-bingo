// import { writeFileSync } from 'fs'
import * as https from 'https'

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const BASE_URL = 'https://19iqaec2c8.execute-api.eu-west-1.amazonaws.com/default'

export const ITEM_PLACES = {
  // item_g: [
  //   // Snug Cafe
  //   'ChIJm5RpBEyvqxQR-gheH8LfSZM',
  //   // Vintage
  //   'ChIJqSGnCPuvqxQROvEQxQhsLTc',
  //   // Cafe Retro
  //   'ChIJLWX7aKOuqxQRRQUC71C0ri4',
  //   // Le Petite Nicholas
  //   'ChIJHY6LYKKuqxQRuN1P3moLawA',
  //   // French Guy
  //   'ChIJg0aZGPqvqxQRvnChs7DttJo'
  // ],
  // item_h: [
  //   'ChIJQcjFOjqsqxQRadxHlO8Wzw0',
  //   'ChIJP0rfCFOvqxQRDBL0FnMus80'
  // ],
  // item_a: [
  //   'ChIJOzPghfhRpEARDQTKL1t2t7A',
  //   'ChIJq6qqqlqoqxQR7YoSEV8YGpA',
  //   'ChIJZztZS1mvqxQR27eeUF_o7Dk',
  //   'ChIJKQSQp1apqxQRQWeTIPEnQxA',
  //   'ChIJm0c-S5CnqxQRvYI3rBHsZsU'
  // ],
  // item_b: [
  //   "ChIJp8ax4OKyqxQR4xubepdzpCk",
  //   "ChIJMbLBNquxqxQRWrltEAtvoGY",
  //   "ChIJLVcaQcxSqhQRx4RSORRzxBk"
  // ],
  // item_c: [
  //   // Wakeup
  //   "ChIJjVEuniesqxQRodXjw-qVMjI",
  //   // bakery in the corner near lounge
  //   "ChIJFQw8IeKvqxQRV5aDxGFenz4",
  //   //Billa
  //   "ChIJ8WjoSVuvqxQRpfD9pVCEPzk",
  //   // Banski Samun
  //   "ChIJ71_5un6vqxQRIIYGluAGeIY",
  //   // Gypsy 
  //   "ChIJKS9ti6qvqxQRQSKijVhATkY",
  //   // petit nicolas
  //   "ChIJHY6LYKKuqxQRuN1P3moLawA",
  //   // Bakery Alya
  //   'ChIJD1kgu_CvqxQRXZo6FUFAVIk'
  // ],
  // item_d : [
  //   "ChIJd-DZhsOtqxQRjqPgLZ9TnQM",
  //   "ChIJCTk8u2qtqxQRurBewRyaIb8",
  //   "ChIJpfGy1mavqxQRLhWrdI_XWDQ"
  // ],
  // item_e: [
  //   "ChIJZ2yDou-vqxQR2wo0mH-4i-0",
  //   "ChIJLxJphqSuqxQRYTdB-m8NwsM",
  //   "ChIJ354TK6KuqxQRWTHYztHxw8c",
  //   "ChIJZU6cxXqvqxQRwxq3rl8QYAA",
  //   "ChIJnVkl_5yuqxQRSUFcNMP7s9g",
  //   "ChIJLy3NCqKuqxQRxoKKubA7vGc",
  //   "ChIJLzrrmh-tqxQRiFfWhJJYQ9Y",
  //   "ChIJUSD3pKKuqxQR_Skej-6M0Ag"
  // ],
  // item_f: [
  //   "ChIJdTopltN2qxQRdDBRC1joZek",
  //   "ChIJR1DQsHyvqxQRQhUUV0dCVHg",
  //   "ChIJSYr616WvqxQRtk1w-GZ5Zvs",
  //   "ChIJV6R_Z6euqxQRfAi8b55Ms48"
  // ],
  // item_i:[
  //   "ChIJGdU6Hb_iqhQRInfCtfEKi-A",
  //   "ChIJ8wP01G3hqhQRjwGACAijzC8",
  //   "ChIJsdNAyMtkrBQRFfeidfYFyX4",
  //   "ChIJHwID7gBlrBQRFSqsxsUOwiQ",
  //   "ChIJCe_pbyXNqxQR8IUNzRSgAAo",
  //   "ChIJIx9-lMcuqhQRc4lTT87rwyg",
  //   "ChIJfaXDlG1_qxQR0GcCVEnPe74",
  //   "ChIJZ3DQkVkHrRQRujlVdgzhrO8",
  //   "ChIJMbLBNquxqxQRWrltEAtvoGY",
  //   "ChIJLVcaQcxSqhQRx4RSORRzxBk"
  // ],
  // item_j: [
  //   "ChIJkT1qbTqsqxQRKIBOK0SY1f0",
  //   "ChIJgV4bAyCsqxQRcyg9PjtcVok"
  // ],
  // item_k: [
  //   "ChIJB021tHCvqxQRrd3u5S4YSO8",
  //   "ChIJtQXHCumvqxQRC2oH2CL878Y"
  // ],
  // item_l: [
  //   "ChIJ30YubLyuqxQROWiblcg1b4w"
  // ],
  // item_m: [
  //   "ChIJmyOjpqSuqxQRDUw84M81fcw",
  //   "ChIJm_HmC52uqxQRkU9odMh_n2E",
  //   "ChIJzYj1_KKuqxQRPTaIPIQY0OI"
  // ],
  // item_n: [
  //   "ChIJ61CWOc6tqxQR6RHWruVk3w4",
  //   "ChIJo3YJVJ6uqxQRRhTNJywe4-w"

  // ],
  // item_o: [
  //   "ChIJJyYhX52uqxQREJAo4jW7F7U"
  // ],
  // item_p: [
  //   "ChIJTcMUwzStqxQRs9YGDPg8Xmg",
  //   "ChIJhTb9INmtqxQRsL3Eoyfau18"
  // ]
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
      // writeFileSync('scripts/item-places-details.ts', placeObject, {
      //   flag: 'w'
      // })
    })
  }).on('error', (err) => {
    console.log('Error: ' + err.message)
  })
}

export function main () {
  console.log('Running item places script...')

  Object.entries(ITEM_PLACES).map(async ([itemId, placesList]) => {
    placesList.map(async (placeId) => {
      getPlaceDetails(itemId, placeId)
    })
  }) 
}

main()
