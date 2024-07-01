import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const login = (id, name) => {
    axios
      .post(`http://localhost:8080/user/info?user_id=${id}`)
      .then((response) => {
        console.log("response", response);
        setUser({ ...response.data });
        setIsLoggedIn(true);
        // setUser({ id, name });
        localStorage.setItem("user", JSON.stringify({ id, name }));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const logout = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes("access_token")) {
        localStorage.removeItem(key);
      }
    }
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateUser = (id, name) => {
    setUser({ id, name });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { id, name } = JSON.parse(storedUser);
      login(id, name);
    } else {
      setUser({ user_id: "" });
    }
    // 개발자도구 실행 감지.
    // console.log(
    //   Object.defineProperties(new Error(), {
    //     toString: {
    //       value() {
    //         new Error().stack.includes("toString@") && alert("Safari devtools");
    //       },
    //     },
    //     message: {
    //       get() {
    //         document.location.href = "http://localhost:3500/nahhh";
    //       },
    //     },
    //   })
    // );
  }, []);

  useEffect(() => {
    if (user) {
      console.log("user", user);
      setLoading(false); // 로딩 완료
    }
  }, [user]);

  // 로딩 중이면 아무것도 렌더링하지 않음
  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, updateUser, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
