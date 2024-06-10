import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const url = "http://localhost:8080/";
  const [data, setData] = useState(null);
  const [pw, setPw] = useState("");
  var daaa;

  // useEffect(() => {
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       console.log(res.data);
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

  const findPw = () => {
    const id = document.getElementById("id").value;
    const email = document.getElementById("email").value;
    console.log(id);
    console.log(email);
    axios
      .get(url + "findPw?userId=" + id + "&userEmail=" + email)
      .then((res) => {
        console.log(res.data);
        // 데이터가 객체인 경우, 객체의 값을 배열로 변환
        if (res.data && typeof res.data === "object" && res.data !== null) {
          daaa = res.data;
          console.log(daaa.id);
          setPw(Object.values(res.data));
        } else {
          setPw(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        id:
        <input type="text" name="userId" id="id" />
        email:
        <input type="text" name="userEmail" id="email" />
        <button onClick={findPw}>비번 찾기</button>
        <div>비번:{pw}</div>
      </div>
    </div>
  );
}

export default App;
