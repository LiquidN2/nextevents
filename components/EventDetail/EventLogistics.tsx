import React from 'react';
import Image from 'next/image';
import AddressIcon from '../Icons/address-icon';
import DateIcon from '../Icons/date-icon';
import LogisticsItem from './LogisticsItem';
import styles from './EventLogistics.module.scss';

import { formatDate, formatAddress } from '../../utils/helpers';

type Props = {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
};

const EventLogistics: React.FC<Props> = ({
  date,
  address,
  image,
  imageAlt,
}) => (
  <section className={styles.logistics}>
    <div className={styles.image}>
      <Image src={`/${image}`} alt={imageAlt} width={250} height={250} />
    </div>
    <ul className={styles.list}>
      <LogisticsItem icon={DateIcon}>
        <time>{formatDate(date)}</time>
      </LogisticsItem>
      <LogisticsItem icon={AddressIcon}>
        <address>{formatAddress(address)}</address>
      </LogisticsItem>
    </ul>
  </section>
);

export default EventLogistics;
