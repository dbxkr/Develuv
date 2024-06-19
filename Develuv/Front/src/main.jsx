import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./components/login/login.css";
import LoginPage from "./components/login/LoginPage.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginCallback from "./components/login/LoginCallback.jsx";
import ImageUpload from "./components/imgupload.jsx";
import Header from "./components/Header";
import ChatList from "./components/chat/ChatList.jsx";
import { AuthProvider } from "./AuthProvider.jsx";
import NotFound from "./components/notfound/notfounf.jsx";
import RegisterPage from "./components/register/RegisterPage.jsx";
import Matching from "./components/main/Matching.jsx";
import Modal from "./components/main/Modal.jsx";
import Mypage from "./components/mypage/Mypage.jsx";
import MainChat from "./components/MainChat.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/callback/:provider" element={<LoginCallback />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/imgtest" element={<ImageUpload />} />
          <Route path="/chat" element={<ChatList />} />
          <Route path={"/main"} element={<Matching />} />
          <Route path={"/mypage/:user_id"} element={<Mypage />} />
          <Route path="/modal" element={<Modal />} />
          <Route path="/mainchat" element={<MainChat />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);
