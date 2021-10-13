import React from 'react';
import styles from './LogisticsItem.module.scss';

const LogisticsItem: React.FC<{ icon: React.FC }> = ({ icon, children }) => {
  const Icon = icon;

  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span className={styles.content}>{children}</span>
    </li>
  );
};

export default LogisticsItem;
