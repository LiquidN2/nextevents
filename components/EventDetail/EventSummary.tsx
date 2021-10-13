import React from 'react';
import styles from './EventSummary.module.scss';

const EventSummary: React.FC<{ title: string }> = ({ title }) => (
  <section className={styles.summary}>
    <h1>{title}</h1>
  </section>
);

export default EventSummary;
