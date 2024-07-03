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
import ChatCmd from "./components/chat/ChatCmd.jsx";
import FreeQuiz from "./components/freeToken/FreeQuiz.jsx";
import FreeQuizForm from "./components/freeToken/FreeQuizForm.jsx";
import Admin from "./components/admin/Admin.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <LoginPage />
            </>
          }
        />
        <Route
          path="/callback/:provider"
          element={
            <>
              <Header />
              <LoginCallback />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header />
              <RegisterPage />
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <Header />
              <ChatList />
            </>
          }
        />
        <Route
          path="/chatroom"
          element={
            <>
              <Header />
              <Chat />
            </>
          }
        />
        <Route
          path={"/main"}
          element={
            <>
              <Header />
              <Matching />
            </>
          }
        />
        <Route
          path={"/mypage/:user_id"}
          element={
            <>
              <Header />
              <Mypage />
            </>
          }
        />
        <Route
          path={"/mypage/:user_id/quiz"}
          element={
            <>
              <Header />
              <UserQuiz />
            </>
          }
        />
        <Route
          path="/modal"
          element={
            <>
              <Header />
              <Modal />
            </>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <Header />
              <NotFound />
            </>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <>
              <Header />
              <UserProfileEdit />
            </>
          }
        />
        <Route
          path="/nahhh"
          element={
            <>
              <Header />
              <Nahhh />
            </>
          }
        />

        <Route
          path="/free"
          element={
            <>
              <Header />
              <FreeQuiz />
            </>
          }
        />
        <Route
          path="/free/quiz"
          element={
            <>
              <Header />
              <FreeQuizForm />
            </>
          }
        />
        <Route path={"/singlechat"} element={<ChatCmd />} />
        <Route path={"/admin"} element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
