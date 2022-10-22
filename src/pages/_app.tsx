import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../contexts/AuthContextProvider';
import { RouteGuard } from '../contexts/RouteGuard';

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthContextProvider><RouteGuard><Component {...pageProps} /></RouteGuard></AuthContextProvider>;
}

export default MyApp;
