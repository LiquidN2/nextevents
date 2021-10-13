import React, { ChangeEventHandler, useState } from 'react';
import Button from '../UI/Button';

import styles from './EventsSearchForm.module.scss';

export type Props = {
  handleFindEvents: ({ year, month }: { year: number; month: number }) => void;
};

const EventsSearchForm: React.FC<Props> = ({ handleFindEvents }) => {
  const [year, setYear] = useState(2021);
  const [month, setMonth] = useState(1);

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = event => {
    switch (event.currentTarget.name) {
      case 'year':
        setYear(+event.currentTarget.value);
        break;

      case 'month':
        setMonth(+event.currentTarget.value);
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleFindEvents({ year, month });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Year</label>
          <select
            name="year"
            id="year"
            value={year}
            onChange={handleSelectChange}
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <div className={styles.control}>
          <label htmlFor="month">Month</label>
          <select
            name="month"
            id="month"
            value={month}
            onChange={handleSelectChange}
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button btnType="submit">Find events</Button>
    </form>
  );
};

export default EventsSearchForm;
