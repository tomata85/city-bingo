/* eslint-disable @typescript-eslint/explicit-function-return-type */
const url = 'https://b39b828gcb.execute-api.ap-northeast-1.amazonaws.com'

function requestOptions (method: string, body?: any) {
  const headers = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }

  return headers
}

async function call (url: string, requestOptions: any) {
  return await fetch(url, requestOptions)
    .catch((err) => {
      console.log(err.message)
    })
}

export function toggleCheckItem (item: string) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  call(`${url}/toggleCheckItem`, requestOptions('POST', { id: item, data: 'checked' }))
}
