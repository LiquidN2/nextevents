import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { EventObj } from '../../types/events';

import { useRouter } from 'next/router';

import { fetchEventById, fetchFeaturedEventIds } from '../../data/model';

import Head from 'next/head';
import EventSummary from '../../components/EventDetail/EventSummary';
import EventLogistics from '../../components/EventDetail/EventLogistics';
import EventContent from '../../components/EventDetail/EventContent';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import Button from '../../components/UI/Button';
import Comments from '../../components/Input/Comments';

const Event: NextPage<{ event: EventObj; eventNotFound: boolean }> = ({
  event,
  eventNotFound = false,
}) => {
  const router = useRouter();

  if (router.isFallback) return <div className="center">Fetching event...</div>;

  if (eventNotFound)
    return (
      <>
        <Head>
          <title>Event Not Found</title>
        </Head>
        <div className="center">
          <ErrorAlert>Event Not Found</ErrorAlert>
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );

  return (
    <>
      <Head>
        <title>NextEvents | {event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export default Event;

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await fetchFeaturedEventIds();
  const paths = ids.map(id => ({ params: { id } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async context => {
  const id = context.params?.id;

  if (typeof id === 'string') {
    try {
      const event = await fetchEventById(id);
      if (!event) return { props: { eventNotFound: true } };

      return {
        props: { event },
        revalidate: 30,
      };
    } catch (err) {
      return { props: { eventNotFound: true } };
    }
  }

  return { redirect: { statusCode: 307, destination: '/events' } };
};
