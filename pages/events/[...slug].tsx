import type { GetServerSideProps, NextPage } from 'next';
import type { EventObj } from '../../types/events';

import Head from 'next/head';
import EventList from '../../components/Events/EventList';
import ResultsTitle from '../../components/ResultsTitle/ResultsTitle';
import Button from '../../components/UI/Button';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';

import { fetchFilteredEvents } from '../../data/model';
import { useState } from 'react';

type PageProps = {
  events: EventObj[] | undefined;
  error: string | undefined;
  month?: number | undefined;
  year?: number | undefined;
};

const FilteredEvents: NextPage<PageProps> = ({
  events,
  error,
  year,
  month,
}) => {
  const pageHead = (
    <Head>
      <title>Events for</title>
    </Head>
  );

  if (error || !year || !month)
    return (
      <>
        <div className="center">
          <ErrorAlert>{error}</ErrorAlert>
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );

  if (!events || events.length === 0)
    return (
      <>
        <div className="center">
          <ErrorAlert>No Events Found</ErrorAlert>
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );

  return (
    <>
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventList events={events} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const slug = context.params?.slug;

    if (!slug) return { redirect: { statusCode: 307, destination: '/events' } };

    const year =
      !isNaN(+slug[0]) && +slug[0] > 2020 && +slug[0] < 2031 ? +slug[0] : null;

    const month =
      !isNaN(+slug[1]) && +slug[1] > 0 && +slug[1] < 13 ? +slug[1] : null;

    const invalidFilters = !Array.isArray(slug) || !year || !month;

    if (invalidFilters) return { props: { error: 'Invalid filters' } };

    const events = await fetchFilteredEvents({ year, month });

    if (!events) return { props: { error: 'No Event Found' } };

    return { props: { events, year, month } };
  } catch (err) {
    return { notFound: true };
  }
};

export default FilteredEvents;
