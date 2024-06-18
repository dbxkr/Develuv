import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (id, name) => {
    setIsLoggedIn(true);
    setUser({ id, name });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateUser = (id, name) => {
    setUser({ id, name });
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
