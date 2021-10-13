import type { GetStaticProps, NextPage } from 'next';
import type { EventObj } from '../types/events';

import Head from 'next/head';

import EventList from '../components/Events/EventList';
import NewsletterRego from '../components/Input/NewsletterRego';

import { fetchFeaturedEvents } from '../data/model';

const Home: NextPage<{ featuredEvents: EventObj[] }> = ({ featuredEvents }) => (
  <>
    <Head>
      <title>NextEvents | Featured Events</title>
      <meta
        name="description"
        content="Find events that suit your interests and allow you to grow"
      />
    </Head>
    <NewsletterRego />
    <EventList events={featuredEvents} />
  </>
);

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const featuredEvents = await fetchFeaturedEvents();

    if (!featuredEvents) throw 'Error not found';

    return {
      props: { featuredEvents },
      revalidate: 3600, // re-generate every 60 mins
    };
  } catch (err) {
    return { notFound: true };
  }
};
