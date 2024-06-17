import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./components/login/login.css";
import LoginPage from "./components/login/LoginPage.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginCallback from "./components/login/LoginCallback.jsx";
import Quiz from "./components/register/Quiz.jsx";
import SignupStep2 from "./components/register/SignupStep2.jsx";
import Regi3Form from "./components/register/Register3/Regi3Form.jsx";
import Regi5Form from "./components/register/Register5/Regi5Form.jsx";
import Nbti from "./components/register/Nbti.jsx";
import MainPage from "./components/login/MainPage.jsx";
import Matching from "./components/main/Matching.jsx";
import Mypage from "./components/mypage/Mypage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/callback/:provider" element={<LoginCallback />} />
      <Route path="/register/1" element={<Quiz />} />
      <Route path="/register/2" element={<SignupStep2 />} />
      <Route path="/register/3" element={<Regi3Form />} />
      <Route path="/register/4" element={<Nbti />} />
      <Route path="/register/5" element={<Regi5Form />} />
      <Route path={"/main"} element={<Matching />}/>
      <Route path={"/mypage/:id"} element={<Mypage/>}/>
    </Routes>
  </BrowserRouter>
);
