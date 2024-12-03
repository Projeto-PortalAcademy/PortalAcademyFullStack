import "../styles/globals.css"; // Certifique-se de que seu CSS global está correto
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Substitua pelo seu Client ID do Google
const clientId = "26016779977-ncd6go4kfkbfeermarclvbvndp2glaqo.apps.googleusercontent.com";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}

export default MyApp;
