import React from 'react';
import styles from './EventContent.module.scss';

const EventContent: React.FC = ({ children }) => (
  <section className={styles.content}>{children}</section>
);

export default EventContent;
