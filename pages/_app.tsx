import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import '../styles/globals.scss';
import { NotificationContextProvider } from '../store/notificationContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
