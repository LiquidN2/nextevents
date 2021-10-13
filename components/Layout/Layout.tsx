import React, { useContext } from 'react';
import MainHeader from './MainHeader';
import Head from 'next/head';
import Notification from '../Notification/Notification';
import NotificationContext from '../../store/notificationContext';

const Layout: React.FC = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>NextEvents</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="NextJS Events" />
      </Head>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
