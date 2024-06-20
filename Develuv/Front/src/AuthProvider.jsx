import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const login = (id, name) => {
    setIsLoggedIn(true);
    setUser({ id, name });
    localStorage.setItem("user", JSON.stringify({ id, name }));
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

    setUser({ id: "", name: "" });
    if (storedUser) {
      const { id, name } = JSON.parse(storedUser);
      setUser({ id, name });
      setIsLoggedIn(true);
    }
    setLoading(false); // 로딩 완료
  }, []);

  // 로딩 중이면 아무것도 렌더링하지 않음
  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
