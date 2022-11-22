import { parseCookies } from "nookies";
import axios from "axios";

export function getAPIClient(ctx?: any) {
  const { "next.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://backend:8080/",
    timeout: 1200,
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
}

export function clientGetAPIClient(ctx?: any) {
  const { "next.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 1200,
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
}