import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { AuthProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
