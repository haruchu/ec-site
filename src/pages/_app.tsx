import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../contexts/AuthContextProvider';
import { RouteGuard } from '../contexts/RouteGuard';
import { Layout } from '../layout/layout';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AuthContextProvider>
      <RouteGuard>
        <Layout currentRouter={router}>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </AuthContextProvider>
  );
}

export default MyApp;
