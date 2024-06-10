// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//
// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }


import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const url = "http://localhost:8080/data";
  const [data, setData] = useState(null);
  var daaa;

  useEffect(() => {
    axios.get(url)
      .then(res => {
        // 데이터가 객체인 경우, 객체의 값을 배열로 변환
        if (res.data && typeof res.data === 'object' && res.data !== null) {
          daaa = res.data;
          console.log(daaa.id);
          setData(Object.values(res.data));
        } else {
          setData(res.data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {/*{data ? (*/}
      {/*  // 데이터가 배열인 경우, map 함수를 사용하여 렌더링*/}
      {/*  Array.isArray(data) ? data.map((item, index) => (*/}
      {/*    <div key={index}>받아온값: {item}</div>*/}
      {/*  )) : (*/}
      {/*    // 데이터가 원시 타입인 경우, 직접 렌더링*/}
      {/*    <div>받아온값: {data}</div>*/}
      {/*  )*/}
      {/*) : (*/}
      {/*  // 데이터가 없는 경우, 로딩 메시지 표시*/}
      {/*  <div>데이터를 불러오는 중...</div>*/}
      {/*)}*/}
      받아온 값 : {data}
    </div>
  );
}

export default App
