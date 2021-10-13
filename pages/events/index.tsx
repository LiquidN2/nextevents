import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import Head from 'next/head';
import EventList from '../../components/Events/EventList';
import EventsSearchForm, {
  Props,
} from '../../components/Events/EventsSearchForm';

import type { EventObj } from '../../types/events';

import { fetchAllEvents } from '../../data/model';

const Events: NextPage<{ events: EventObj[] }> = ({ events }) => {
  const router = useRouter();

  const handleFindEvents: Props['handleFindEvents'] = async ({
    year,
    month,
  }) => {
    // setEvents(getFilteredEvents({ year, month }));
    await router.push(`/events/${year}/${month}`);
  };

  return (
    <>
      <Head>
        <title>NextEvents | All Events</title>
        <meta
          name="description"
          content="Find events that suit your interests and allow you to grow"
        />
      </Head>
      <EventsSearchForm handleFindEvents={handleFindEvents} />
      <EventList events={events} />
    </>
  );
};

export default Events;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const events = await fetchAllEvents();
    if (!events) throw 'No Events Found!';
    return { props: { events } };
  } catch (err) {
    return { notFound: true };
  }
};
