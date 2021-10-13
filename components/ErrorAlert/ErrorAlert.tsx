import React from 'react';
import styles from './ErrorAlert.module.scss';

const ErrorAlert: React.FC = props => (
  <div className={styles.alert}>{props.children}</div>
);

export default ErrorAlert;
