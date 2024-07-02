import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./components/login/login.css";
import LoginPage from "./components/login/LoginPage.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginCallback from "./components/login/LoginCallback.jsx";
import Header from "./components/Header";
import ChatList from "./components/chat/ChatList.jsx";
import { AuthProvider } from "./AuthProvider.jsx";
import Chat from "./components/chat/Chat.jsx";
import NotFound from "./components/notfound/notfounf.jsx";
import RegisterPage from "./components/register/RegisterPage.jsx";
import Matching from "./components/main/Matching.jsx";
import Modal from "./components/main/Modal.jsx";
import Mypage from "./components/mypage/Mypage.jsx";
import UserQuiz from "./components/mypage/UserQuiz.jsx";
import UserProfileEdit from "./components/userEdit/UserProfileEdit.jsx";
import Nahhh from "./components/notfound/nahhh.jsx";
import FreeQuiz from "./components/freeToken/FreeQuiz.jsx";
import FreeQuizForm from "./components/freeToken/FreeQuizForm.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/callback/:provider" element={<LoginCallback />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/chatroom" element={<Chat />} />
        <Route path={"/main"} element={<Matching />} />
        <Route path={"/mypage/:user_id"} element={<Mypage />} />
        <Route path={"/mypage/:user_id/quiz"} element={<UserQuiz />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/edit-profile" element={<UserProfileEdit />} />
        <Route path="/nahhh" element={<Nahhh />} />
        <Route path="/free" element={<FreeQuiz />} />
        <Route path="/free/quiz" element={<FreeQuizForm />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
