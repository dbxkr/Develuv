import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const url = "http://localhost:8080/";
  const [data, setData] = useState(null);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [user, setUser] = useState(null);

  var daaa;

  const findId = () => {
    const email = document.getElementById("email").value;
    axios
      .get(url + "findId?user_email=" + email)
      .then((res) => {
        console.log(res.data);
        // 데이터가 객체인 경우, 객체의 값을 배열로 변환
        if (res.data && typeof res.data === "object" && res.data !== null) {
          setId(Object.values(res.data));
        } else {
          setId(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

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
      {/* <div>
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
        <button onClick={findId}>아이디 찾기</button>
        <button onClick={findPw}>비번 찾기</button>
        <div>유저 정보:{JSON.stringify(user)}</div>
        <div>아이디 찾기 결과:{id}</div>
        <div>비번 찾기 결과:{pw}</div>
      </div> */}
      {/* //퀴즈 완료 여부에 따라
//퀴즈 컴포넌트 or 회원가입 2단계 컴포넌트 렌더링
import React, { useState } from 'react'
import './App.css'
import Quiz from './components/Quiz'
import SignupStep2 from './components/SignupStep2'

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false) // 퀴즈 완료 상태 변수

  return (
    <div className="App">
      {quizCompleted ? (
        // 퀴즈가 완료된 경우 회원가입 2단계 컴포넌트를 렌더링 (SignupStep2)
        <SignupStep2 />
      ) : (
        // 퀴즈가 완료되지 않은 경우 퀴즈 컴포넌트를 렌더링
        <Quiz onSuccess={() => setQuizCompleted(true)} />
      )} */}
    </div>
  );
}

export default App;
