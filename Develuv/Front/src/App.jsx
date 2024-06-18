import { useEffect, useState } from "react";
import axios from "axios";

import Regi5Form from "./components/register/Register5/Regi5Form";
import Regi3Form from "./components/register/Register3/Regi3Form";
import Nbti from "./components/register/Nbti";
import Chat from "./components/chat/Chat";

function App() {
  // const url = "http://localhost:8080/data";
  // const [data, setData] = useState(null);
  // var daaa;

  // useEffect(() => {
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       // 데이터가 객체인 경우, 객체의 값을 배열로 변환
  //       if (res.data && typeof res.data === "object" && res.data !== null) {
  //         daaa = res.data;
  //         console.log(daaa.id);
  //         setData(Object.values(res.data));
  //       } else {
  //         setData(res.data);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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
      {/* 받아온 값 : {data} */}
      {/* <Nbti /> */}
      {/* <Regi5Form /> */}
      {/* <Regi3Form /> */}
      <Chat />
    </div>
  );
}

export default App;
