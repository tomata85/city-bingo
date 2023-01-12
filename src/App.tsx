import React from 'react';
import './App.css';

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

function App() {
  const url = "https://b39b828gcb.execute-api.ap-northeast-1.amazonaws.com";

  const handleClick = (e: any) => {
    call(`${url}/toggleCheckItem`, requestOptions('POST', { id: "Adela", name: "hello"}));
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>Click me!</button>
      </header>
    </div>
  );
}

export default App;
