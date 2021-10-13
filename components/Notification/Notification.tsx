import React, { useContext } from 'react';

import styles from './notification.module.scss';
import NotificationContext from '../../store/notificationContext';

type Props = {
  title: string;
  message: string;
  status: string;
};

const Notification: React.FC<Props> = ({ title, message, status }) => {
  const notificationCtx = useContext(NotificationContext);

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = styles.success;
  }

  if (status === 'error') {
    statusClasses = styles.error;
  }

  if (status === 'pending') {
    statusClasses = styles.pending;
  }

  const activeClasses = `${styles.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
