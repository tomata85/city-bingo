import { writeFileSync } from 'fs'
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
  item_b: [
    "ChIJp8ax4OKyqxQR4xubepdzpCk",
    "ChIJMbLBNquxqxQRWrltEAtvoGY",
    "ChIJLVcaQcxSqhQRx4RSORRzxBk"
  ],
  item_c: [
    // Wakeup
    "ChIJjVEuniesqxQRodXjw-qVMjI",
    // bakery in the corner near lounge
    "ChIJFQw8IeKvqxQRV5aDxGFenz4",
    //Billa
    "ChIJ8WjoSVuvqxQRpfD9pVCEPzk",
    // Banski Samun
    "ChIJ71_5un6vqxQRIIYGluAGeIY",
    // Gypsy 
    "ChIJKS9ti6qvqxQRQSKijVhATkY",
    // petit nicolas
    "ChIJHY6LYKKuqxQRuN1P3moLawA"
  ],
  item_d : [
    "ChIJd-DZhsOtqxQRjqPgLZ9TnQM",
    "ChIJCTk8u2qtqxQRurBewRyaIb8",
    "ChIJpfGy1mavqxQRLhWrdI_XWDQ"
  ],
  item_e: [

  ],
  item_f: [
    "ChIJdTopltN2qxQRdDBRC1joZek",
    "ChIJR1DQsHyvqxQRQhUUV0dCVHg",
    "ChIJSYr616WvqxQRtk1w-GZ5Zvs",
    "ChIJV6R_Z6euqxQRfAi8b55Ms48"
  ],
  item_i:[
    "ChIJGdU6Hb_iqhQRInfCtfEKi-A",
    "ChIJ8wP01G3hqhQRjwGACAijzC8",
    "ChIJsdNAyMtkrBQRFfeidfYFyX4",
    "ChIJHwID7gBlrBQRFSqsxsUOwiQ",
    "ChIJCe_pbyXNqxQR8IUNzRSgAAo",
    "ChIJIx9-lMcuqhQRc4lTT87rwyg",
    "ChIJfaXDlG1_qxQR0GcCVEnPe74",
    "ChIJZ3DQkVkHrRQRujlVdgzhrO8",
    "ChIJMbLBNquxqxQRWrltEAtvoGY",
    "ChIJLVcaQcxSqhQRx4RSORRzxBk"
  ],
  item_j: [
    "ChIJkT1qbTqsqxQRKIBOK0SY1f0",
    "ChIJgV4bAyCsqxQRcyg9PjtcVok"
  ],
  item_k: [
    "ChIJB021tHCvqxQRrd3u5S4YSO8",
    "ChIJtQXHCumvqxQRC2oH2CL878Y"
  ],
  item_l: [
    "ChIJ30YubLyuqxQROWiblcg1b4w"
  ],
  item_m: [
    "ChIJmyOjpqSuqxQRDUw84M81fcw",
    "ChIJm_HmC52uqxQRkU9odMh_n2E",
    "ChIJzYj1_KKuqxQRPTaIPIQY0OI"
  ],
  item_n: [
    "ChIJ61CWOc6tqxQR6RHWruVk3w4",
    "ChIJo3YJVJ6uqxQRRhTNJywe4-w"

  ],
  // item_o: [
  //   "ChIJJyYhX52uqxQREJAo4jW7F7U"
  // ],
  // item_p: [
  //   "ChIJTcMUwzStqxQRs9YGDPg8Xmg"
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
  console.log('Starting item places script...')

  Object.entries(ITEM_PLACES).map(async ([itemId, placesList]) => {
    placesList.map(async (placeId) => {
      getPlaceDetails(itemId, placeId)
    })
  })
  console.log('Finished item places script.')
}

main()

➜  city-bingo git:(crop-did-it-image) ✗ tsc scripts/item-places-script.ts
// ➜  city-bingo git:(crop-did-it-image) ✗ node scripts/item-places-script.js
// Starting item places script...
// Finished item places script.
// {
//   name: 'Wake UP coffee & juice bar',
//   googleMapsLink: 'https://maps.google.com/?cid=3617118286273303969',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqHA6zQQKmxj64bd-TzNyd94e9ExKSbf1mFYPpTgpHxgRCRZ41Kc5QUL3fLyf9IArb8e-uFNdk612ur66NKHY6FQYR-8jrq7DGg=s1600-w400',
//   itemId: 'item_c',
//   placeId: 'ChIJjVEuniesqxQRodXjw-qVMjI'
// }
// {
//   name: 'Banski Samun Artisan Bakery',
//   googleMapsLink: 'https://maps.google.com/?cid=9689502159947073056',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqERCymi5hT8IIFyfQ85ldcAwcwlTNSoB5n9o0gI2e3cfJMySLQrFvcGXsNTtWfLAl4eZ_Z9_BX9u3MRbxBY2x4v1ti35NjwbM0=s1600-w400',
//   itemId: 'item_c',
//   placeId: 'ChIJ71_5un6vqxQRIIYGluAGeIY'
// }
// {
//   name: 'Rhodope Mountains',
//   googleMapsLink: 'https://maps.google.com/?cid=17270426114700163514',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqFpZIRTG63cRzmrjEpCNazfyuJ3M0gZvQd8XpZ0IWaaBcEvxFUz7MQpknapoZvXswMqbvH3zZDGO2eRXW-msyfjqJzuodUS09M=s1600-w400',
//   itemId: 'item_i',
//   placeId: 'ChIJZ3DQkVkHrRQRujlVdgzhrO8'
// }
// {
//   name: `Ресторант "Рибарска Среща" (Fisherman's meet)`,
//   googleMapsLink: 'https://maps.google.com/?cid=18290692880186900520',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqFqQrJna8CTjpvkZD63J-JawPJLG57E39a4R_tblHG5bmEweWIUxLk1_nEt-TZFqGNKm8rDYr-lhhqLKH1ElxE174buDcdQxTQ=s1600-w400',
//   itemId: 'item_j',
//   placeId: 'ChIJkT1qbTqsqxQRKIBOK0SY1f0'
// }
// {
//   name: 'Mineral baths Rupite',
//   googleMapsLink: 'https://maps.google.com/?cid=2937450653302360435',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqFSgRJtjzD9t2JAnOCRWyfRnfSzHT9JAfj9dB5H9jZufDDwGv2DSqaNxRyb1HhkTdWqcqE7ATK_oSPlgf7_bl7LTM4dsZCaXW8=s1600-w400',
//   itemId: 'item_i',
//   placeId: 'ChIJIx9-lMcuqhQRc4lTT87rwyg'
// }
// {
//   name: 'Le Petit Nicolas',
//   googleMapsLink: 'https://maps.google.com/?cid=30130376132255160',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqFUQeEWpoeIH2DuQ2JfeCo8OyRNrC-seyrA9ZO9_jrqben7g6-Xq5Adhg5UIhtCcUanOP6uyxeQYjQ5w-UXfLS354aWMDhMbxo=s1600-w400',
//   itemId: 'item_c',
//   placeId: 'ChIJHY6LYKKuqxQRuN1P3moLawA'
// }
// {
//   name: 'Ролбан Банско',
//   googleMapsLink: 'https://maps.google.com/?cid=13772458583769657530',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqE6q_EJ3ikyN16uSwQkVgcZpign__OeIK-EevmF-PzRyTPBLBjf_KllGEMDw2kyQPZB4cP4dlFyWUvnq_Osl_vICBH1LYS2z34=s1600-w400',
//   itemId: 'item_d',
//   placeId: 'ChIJCTk8u2qtqxQRurBewRyaIb8'
// }
// {
//   name: 'Demyanishka River eco-trail',
//   googleMapsLink: 'https://maps.google.com/?cid=260456296591958926',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqGTVdRdSTeck2GfpVGZ7tGrAi_0I3gQG3EI7VhqdzkXpte71K417Fc6kPZ6_HSn_7wODzr-e-O2PNH922jOhCuYfReGfp5-hg4=s1600-w400',
//   itemId: 'item_d',
//   placeId: 'ChIJd-DZhsOtqxQRjqPgLZ9TnQM'
// }
// {
//   name: 'Nestwork Coworking',
//   googleMapsLink: 'https://maps.google.com/?cid=18115300034306133430',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqHPAc5UtWV6-yVco2A-1zl9inYt8V1cPhJw5NlvztgqZCR5DpwB-CJ9KlZkdNU_0kBNDYTE0YTrxwcWIjqQnvLfTijetixtNLA=s1600-w400',
//   itemId: 'item_f',
//   placeId: 'ChIJSYr616WvqxQRtk1w-GZ5Zvs'
// }
// {
//   name: 'Apart-Hotel Four Leaf Clover',
//   googleMapsLink: 'https://maps.google.com/?cid=10354704211618039932',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqFJp8L91ZWgtobtjOScl7UJMlncr8xQCzjeqwYBvQQMGkLFtD0GkllPa5rXQ6dl8rnwF618x5xrdvQy9Pzi36fwgjZW2t377rY=s1600-w400',
//   itemId: 'item_f',
//   placeId: 'ChIJV6R_Z6euqxQRfAi8b55Ms48'
// }
// {
//   name: 'KOLIBATA BAR&GRILL',
//   googleMapsLink: 'https://maps.google.com/?cid=1071686173981020649',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqF36bCGPC3tIDmMEWhHu5xrtbMQSm2ZLpjoIeT_VeaoNcuGrHMaKjzOPPkwH6VGMov3pLPpLgfv7wfRrqQa9iX2vjYbZOrmkdI=s1600-w400',
//   itemId: 'item_n',
//   placeId: 'ChIJ61CWOc6tqxQR6RHWruVk3w4'
// }
// {
//   name: 'Melnik',
//   googleMapsLink: 'https://maps.google.com/?q=2820+Melnik,+Bulgaria&ftid=0x14abcd256fe9ef09:0xa00a014cd0d85f0',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqGLrzOzWpJ4Ne7Zt0YAZoVaa1Kr23zm_I7MovAIjrqLWK_DPkNCBrPL1WpejZmNR2ykOGFZF5E4vgENdVt3mPvywrvD_4AHQyY=s1600-w400',
//   itemId: 'item_i',
//   placeId: 'ChIJCe_pbyXNqxQR8IUNzRSgAAo'
// }
// {
//   name: "Eagle's Eye",
//   googleMapsLink: 'https://maps.google.com/?cid=9135839875191469845',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqGHVf9iluutX8rt7y0rtOFY8nQdHLRhZTyBgvNhyxALc7Y4xAFGREohW6yoYgjwBKMnSkplOwVqV86c0EnScwFgymfxy4ZhFjA=s1600-w400',
//   itemId: 'item_i',
//   placeId: 'ChIJsdNAyMtkrBQRFfeidfYFyX4'
// }
// {
//   name: 'Vihren Chalet',
//   googleMapsLink: 'https://maps.google.com/?cid=3000650346169834467',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqH62gXSEfkDo3soqWQ-SGyK0upWVzWn5rPdlDeaeIhawJ3uli2IhFKTnuOLpy5Edbqerd4QjKmA-Pojhq5pP6H9-8_wjXkW3KU=s1600-w400',
//   itemId: 'item_b',
//   placeId: 'ChIJp8ax4OKyqxQR4xubepdzpCk'
// }
// {
//   name: 'Баничарница Вихрен',
//   googleMapsLink: 'https://maps.google.com/?cid=5066057379915899457',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqHTtUMNUEQY65QXzwW5r5ywOyItoAPOShHTfS598V5rYHYKWqox6IP1JX7DA2vseF45bmPhX0Axk2DItEh7iLk9eyLXmDfhjxA=s1600-w400',
//   itemId: 'item_c',
//   placeId: 'ChIJKS9ti6qvqxQRQSKijVhATkY'
// }
// {
//   name: 'BILLA Банско',
//   googleMapsLink: 'https://maps.google.com/?cid=4125161265611796645',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqHKijsgEjy6Lor6Nc0YBSdo9Oj13AcpNvtvkRRfiRFoVKaMYq-r8rPxjPsRX0xKB7Ouady1jhTrwDqWNOvVSvBJbRlkBCQuMMY=s1600-w400',
//   itemId: 'item_c',
//   placeId: 'ChIJ8WjoSVuvqxQRpfD9pVCEPzk'
// }
// {
//   name: 'Coworking Bansko',
//   googleMapsLink: 'https://maps.google.com/?cid=16818103848329621620',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqFaDSpqoR0fvYFTJhLJUhYl0JNK4IWmcnwXyKrXT5cQyLu6jyR7Hxd1nVqYoTCVqJo3WrwGU_HmNd47d37xK1r-MsD02WGEx0w=s1600-w400',
//   itemId: 'item_f',
//   placeId: 'ChIJdTopltN2qxQRdDBRC1joZek'
// }
// {
//   name: 'Bezbog Hut',
//   googleMapsLink: 'https://maps.google.com/?cid=7395032681453304154',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqG28wHha2uMdA_BKeTb1CoaZamMtq4gdrVOSW4fD7JzR7NLNoAEfMY9vH4IjB54ZE-NULkJM_Eoo_m0hx4CkOSTK2mYqwLkAw=s1600-w400',
//   itemId: 'item_i',
//   placeId: 'ChIJMbLBNquxqxQRWrltEAtvoGY'
// }
// {
//   name: 'Sunday Market',
//   googleMapsLink: 'https://maps.google.com/?cid=17242057763093142957',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqGfvkyUhjEPmrKMJRyDt7KJ69iy_yzzHyQrH70BzEks-58cQ4kEUuRxF_Co37gRvwZ5PZ_70RWcCFiBBfN4m_4i-3DOmqhEhKU=s1600-w400',
//   itemId: 'item_k',
//   placeId: 'ChIJB021tHCvqxQRrd3u5S4YSO8'
// }
// {
//   name: 'Bakery',
//   googleMapsLink: 'https://maps.google.com/?cid=4512429125650323031',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqGQs_2l-rSlqKfmSkU9-HOnBvQLAOepCciW5zVHtHjGihXvT2-4x2mZe5_ZAc5OWeXYkL7ZCTMz-FewkwEsZyvdRhQzYDCoPNY=s1600-w400',
//   itemId: 'item_c',
//   placeId: 'ChIJFQw8IeKvqxQRV5aDxGFenz4'
// }
// {
//   name: 'Банско джаз фестивал',
//   googleMapsLink: 'https://maps.google.com/?cid=14734992722762681357',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqGHWo7Qvczg1hyfeVdaax2zUv0wc60mx94O5a-Z89nxFn3TjygVuhphvUEnoVJ38o5cxbSBV2OQwoizPbPAqcOjnGpA3163SoQ=s1600-w400',
//   itemId: 'item_m',
//   placeId: 'ChIJmyOjpqSuqxQRDUw84M81fcw'
// }
// {
//   name: 'Altspace Coworking - Central',
//   googleMapsLink: 'https://maps.google.com/?cid=8670628056766092610',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqG2B-CBhVHqPqeswtHrSyphAXLcVcgNAyo4IQwootqZTy7ARcZmKteqzskajy8_ycSF4VzhKNDL4GObqxq5r3-ooijSlg67s2I=s1600-w400',
//   itemId: 'item_f',
//   placeId: 'ChIJR1DQsHyvqxQRQhUUV0dCVHg'
// }
// {
//   name: 'Див къмпинг',
//   googleMapsLink: 'https://maps.google.com/?cid=3772001699060454702',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqHV765p2ETvqzsSB2MTtULJYhpBmUCZq3tuYHPxJHY4_N5VH8aDI63Raa7PVXNWuY65xni6tuK-3KTMi3R7-lLYfxXiRN_iMrc=s1600-w400',
//   itemId: 'item_d',
//   placeId: 'ChIJpfGy1mavqxQRLhWrdI_XWDQ'
// }
// {
//   name: 'Beglika wild camping spot',
//   googleMapsLink: 'https://maps.google.com/?cid=13725792203190724560',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqGBgfYQz7jc7JNYpQ_Vcw8IsEn6o1cLxylv4YLxFQ4YYGmoVW5vWpVAqPawgVL5AS51AB7Uv5BwcxRAUMaPInatz6iPJU89mPk=s1600-w400',
//   itemId: 'item_i',
//   placeId: 'ChIJfaXDlG1_qxQR0GcCVEnPe74'
// }
// {
//   name: 'Seven Rila Lakes',
//   googleMapsLink: 'https://maps.google.com/?q=Seven+Rila+Lakes&ftid=0x14aae16dd4f403f3:0x2fcca3080880018f',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqFSHkVWhgkRxmmToScpu_i2fjg9M4OjtwKlSEILhhbjgi0iQcd7U--tFN7-3fFl2fPwEFj4B-v2_Pxdb5aoqwsNw1S6m0IPDuA=s1600-w400',
//   itemId: 'item_i',
//   placeId: 'ChIJ8wP01G3hqhQRjwGACAijzC8'
// }
// {
//   name: "Devil's Throat Cave",
//   googleMapsLink: 'https://maps.google.com/?cid=2648695773451790869',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqGcoWXRvK3XDrPVdjTXtDl_kN-KFMawNPvRpoDnYiiEpPPIXHcRzJtO6sdd-gBjxwlodTjk4_QLecX3fK60dGoKRafCHirPNEg=s1600-w400',
//   itemId: 'item_i',
//   placeId: 'ChIJHwID7gBlrBQRFSqsxsUOwiQ'
// }
// {
//   name: 'Caffe Club “NEW”',
//   googleMapsLink: 'https://maps.google.com/?cid=17069520187659457606',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqHOQ_piTsDVfNYU9cnYOHxJGCnbX0DxRTMNQwfrXhAj5YcXYvGjMUkt9EizJPYpdpFRsPasvyBeCGTLLm5fPv8lMqca4sKJrTU=s1600-w400',
//   itemId: 'item_n',
//   placeId: 'ChIJo3YJVJ6uqxQRRhTNJywe4-w'
// }
// {
//   name: 'Неделен пазар',
//   googleMapsLink: 'https://maps.google.com/?cid=14334953365527030283',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqGag8rpM50sOilhqKQXA4leu30liJ2g5Qd8vTVXCY4WtQM_-ETaCm87YWnCVGjOejfbrYOqPNdFaStYO06sbeOkvmAHLP6IIvQ=s1600-w400',
//   itemId: 'item_k',
//   placeId: 'ChIJtQXHCumvqxQRC2oH2CL878Y'
// }
// {
//   name: 'Bezbog Hut',
//   googleMapsLink: 'https://maps.google.com/?cid=7395032681453304154',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqG28wHha2uMdA_BKeTb1CoaZamMtq4gdrVOSW4fD7JzR7NLNoAEfMY9vH4IjB54ZE-NULkJM_Eoo_m0hx4CkOSTK2mYqwLkAw=s1600-w400',
//   itemId: 'item_b',
//   placeId: 'ChIJMbLBNquxqxQRWrltEAtvoGY'
// }
// {
//   name: 'Rila Monastery',
//   googleMapsLink: 'https://maps.google.com/?cid=16180038119511455522',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqEISfMqFW0jnQeFUQYVMRHOfJMbpFatEN3CO2nFT6tg5lSSLpLXRQjICT2PEESVwm48qhye1m7XaHTiK8Knu88zU1-yWLhRer0=s1600-w400',
//   itemId: 'item_i',
//   placeId: 'ChIJGdU6Hb_iqhQRInfCtfEKi-A'
// }
// {
//   name: 'Yavorov Hut',
//   googleMapsLink: 'https://maps.google.com/?cid=1856735477081736391',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqEUQttjjCBjcwzD8_Uj6j9Hw14Hm_zK75IbdiU8bchOkBmooqR3d3KDVcLixwcbADL81adBJiOqH2WRF7vHGhGJFbqlfyJyVrA=s1600-w400',
//   itemId: 'item_i',
//   placeId: 'ChIJLVcaQcxSqhQRx4RSORRzxBk'
// }
// {
//   name: 'Ginger Bar & Dinner',
//   googleMapsLink: 'https://maps.google.com/?cid=7034481641899184017',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqFaZ8S7mjTG8OP8EcG8NcQfFViU-xRAR0wIiJV3VgA7xBU04dOuWZ5nxBXt7woSSnKwCVG8DTzoww5FZDMqu2E9XwciwPg0kbs=s1600-w400',
//   itemId: 'item_m',
//   placeId: 'ChIJm_HmC52uqxQRkU9odMh_n2E'
// }
// {
//   name: 'Yavorov Hut',
//   googleMapsLink: 'https://maps.google.com/?cid=1856735477081736391',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqEUQttjjCBjcwzD8_Uj6j9Hw14Hm_zK75IbdiU8bchOkBmooqR3d3KDVcLixwcbADL81adBJiOqH2WRF7vHGhGJFbqlfyJyVrA=s1600-w400',
//   itemId: 'item_b',
//   placeId: 'ChIJLVcaQcxSqhQRx4RSORRzxBk'
// }
// {
//   name: 'Hotel Complex Zara',
//   googleMapsLink: 'https://maps.google.com/?cid=9896198640710264947',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqHiZfcyWc5d6A9lDMH3NVQcoE3KykgF7qUxMhesVRqpK0qfsgoZim766jUo0rpE9rMyCUNA9y-IuwIF6iYu8WMmp3d5yFGmj7s=s1600-w400',
//   itemId: 'item_j',
//   placeId: 'ChIJgV4bAyCsqxQRcyg9PjtcVok'
// }
// {
//   name: 'Nikola Vaptsarov Monument',
//   googleMapsLink: 'https://maps.google.com/?cid=16343590003957839421',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqGza9tZdPd4H53NDFJR0XdOh4jXGtpOlcYcKX6O9yhsB_8nq0zgD_jqXGme_FzvW-lTSfgaJZOVV2SqfZS2D0fn1aTwTN2gw00=s1600-w400',
//   itemId: 'item_m',
//   placeId: 'ChIJzYj1_KKuqxQRPTaIPIQY0OI'
// }
// {
//   name: 'City Park',
//   googleMapsLink: 'https://maps.google.com/?cid=10119366023344515129',
//   photoUrl: 'https://lh3.googleusercontent.com/places/ANXAkqHXSoG6aaKrvK8wLBh_ETdvd4ktDoA5xjL8BEN5At5mOe-9OEZPqDqUr-jqeNPI-rJ_gClUw_OUCEDW_XUp8hBWAEvUlk63qj4=s1600-w400',
//   itemId: 'item_l',
//   placeId: 'ChIJ30YubLyuqxQROWiblcg1b4w'
// }
// ➜  city-bingo git:(crop-did-it-image) ✗
