import React from 'react';
import Image from 'next/image';
import DateIcon from '../Icons/date-icon';
import AddressIcon from '../Icons/address-icon';
import ArrowRightIcon from '../Icons/arrow-right-icon';
import Button from '../UI/Button';

import { formatDate, formatAddress } from '../../utils/helpers';

import type { EventObj } from '../../types/events';

import styles from './EventItem.module.scss';

const EventItem: React.FC<EventObj> = ({
  id,
  title,
  description,
  location,
  date,
  image,
}) => {
  return (
    <li className={styles.item}>
      <Image src={`/${image}`} alt={title} width={250} height={160} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{formatDate(date)}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formatAddress(location)}</address>
          </div>
        </div>

        <div className={styles.actions}>
          <Button link={`/event/${id}`}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
