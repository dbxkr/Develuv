import { useEffect, useState } from "react";
import axios from "axios";

function LoginPage() {
  const url = "http://localhost:8080/";
  const [data, setData] = useState(null);
  const [pw, setPw] = useState("");
  const [user, setUser] = useState(null);

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
    axios
      .get(url + "findPw?user_id=" + id + "&user_email=" + email)
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

  const login = () => {
    const id = document.getElementById("id").value;
    const pw = document.getElementById("pw").value;
    axios
      .get(url + "login?user_id=" + id + "&user_pw=" + pw)
      .then((res) => {
        console.log(res.data);
        // 데이터가 객체인 경우, 객체의 값을 배열로 변환
        if (res.data && typeof res.data === "object" && res.data !== null) {
          daaa = res.data;
          console.log(daaa.id);
          setUser(Object.values(res.data));
        } else {
          setUser({
            error: "login failed",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        id:
        <input type="text" name="userId" id="id" />
        <br />
        pw:
        <input type="password" name="userPw" id="pw" />
        <br />
        email:
        <input type="text" name="userEmail" id="email" />
        <br />
        <button onClick={login}>로긴하기</button>
        <button onClick={findPw}>비번 찾기</button>
        <div>유저 정보:{JSON.stringify(user)}</div>
        <div>비번 찾기 결과:{pw}</div>
      </div>
    </div>
  );
}

export default LoginPage;
