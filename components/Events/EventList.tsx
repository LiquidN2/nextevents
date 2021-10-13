import React from 'react';
import EventItem from './EventItem';
import styles from './EventList.module.scss';

import type { EventObj } from '../../types/events';

const EventList: React.FC<{ events: EventObj[] }> = ({ events }) => {
  if (events.length === 0) return null;
  return (
    <ul className={styles.list}>
      {events.map((event, i) => (
        <EventItem key={i} {...event} />
      ))}
    </ul>
  );
};

export default EventList;
