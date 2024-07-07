// AuthContext.jsx

import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const checkUser = localStorage.getItem("loggedInUser");
    if (checkUser) {
      setLoggedInUser(JSON.parse(checkUser));
    }
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }
  }, [loggedInUser]);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};
