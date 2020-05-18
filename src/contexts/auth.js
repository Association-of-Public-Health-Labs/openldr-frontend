import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await localStorage.getItem("@RAuth:user");
      const storagedToken = await localStorage.getItem("@RAuth:token");

      if (storagedToken && storagedUser) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

        setUser(JSON.parse(storagedUser));
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  //   async function signIn(user, token) {
  //     setUser(user);

  //     api.defaults.headers.Authorization = `Bearer ${token}`;

  //     await localStorage.setItem("@RAuth:user", JSON.stringify(user));
  //     await localStorage.setItem("@RAuth:token", token);
  //   }

  const signIn = async (user, token) => {
    setUser(user);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    await localStorage.setItem("@RAuth:user", JSON.stringify(user));
    await localStorage.setItem("@RAuth:token", token);
  };

  function signOut() {
    localStorage.removeItem("@RAuth:user");
    localStorage.removeItem("@RAuth:token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn: signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
