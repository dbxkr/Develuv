import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
    if (storedUser) {
      const { id, name } = JSON.parse(storedUser);
      setUser({ id, name });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
