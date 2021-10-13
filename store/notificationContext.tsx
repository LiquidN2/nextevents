import React, { createContext, useEffect, useState } from 'react';

type Notification = {
  title: string;
  message: string;
  status: 'pending' | 'success' | 'error';
};

type Context = {
  notification: Notification | null;
  showNotification: (notificationData: Notification) => void;
  hideNotification: () => void;
};

const NotificationContext = createContext<Context>({
  notification: null,
  showNotification: function (notificationData: Notification) {},
  hideNotification: function () {},
});
export default NotificationContext;

export const NotificationContextProvider: React.FC = ({ children }) => {
  const [activeNotification, setActiveNotification] =
    useState<Notification | null>(null);

  useEffect(() => {
    if (!activeNotification || activeNotification.status === 'pending') return;

    const timer = setTimeout(() => {
      setActiveNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: Notification) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => setActiveNotification(null);

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};
