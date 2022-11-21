import React, { createContext, useEffect, useState } from "react";
import { api } from "../api/api";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";
import Error from "next/error";

interface AuthProviderProp {
  children: React.ReactNode;
}

interface IUserData {
  username: string;
  password: string;
}

interface UserProp{
  username: string;
  account: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  user: UserProp | null;
  error: string | null;
  isLoading: boolean;
  signIn: (data: IUserData) => Promise<void>;
  signUp: (data: IUserData) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProp) {
  const [user, setUser] = useState<UserProp | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "next.token": token } = parseCookies();

    if (token && !user) {
      destroyCookie(null, "next.token");
      Router.push("/iniciar-sessao");
    }
  }, []);

  async function signIn(userData: IUserData) {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("auth", userData);
      const { token, username, account } = response.data;
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setCookie(undefined, "next.token", token);
      console.log({username, account});
      setUser({username, account});

      setTimeout(() => {
        setLoading(false);
        setError(null);
        Router.push("/dashboard");
      }, 1400);
    } catch (error: any) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }

  async function signUp(userData: IUserData) {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("users", userData);
      setTimeout(() => {
        setLoading(false);
        setError(null);
        setTimeout(() => Router.push("/iniciar-sessao"), 900)
      }, 1000);
    } catch (error: any) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }

  async function signOut(){
    setUser(null);
    destroyCookie(null, "next.token");
    Router.push("/iniciar-sessao");
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, error, isLoading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
