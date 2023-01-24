const url = "https://b39b828gcb.execute-api.ap-northeast-1.amazonaws.com";

function requestOptions(method: string, body?: any) {
  const headers = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };

  return headers
}

function call(url: string, requestOptions: any) {
  return fetch(url, requestOptions)
    .catch((err) => {
      console.log(err.message);
    });
}

export function toggleCheckItem (item: string) {
  call(`${url}/toggleCheckItem`, requestOptions('POST', { id: item, data: "checked"}));
}
