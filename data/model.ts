import type { EventObj } from '../types/events';
import { transformEventsData } from '../utils/helpers';

const validateEvents = (events: EventObj[] | undefined) => {
  if (!events || events.length === 0) throw 'No Events Found!';
};

const fetchTransformedEvents = async (query: string = '') => {
  if (!process.env.DB_URL) return;
  const url = `${process.env.DB_URL}/events.json${query ? `?${query}` : ''}`;

  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    if (!jsonData) throw 'Error fetching data';
    return transformEventsData(jsonData);
  } catch (err) {
    throw err;
  }
};

export const fetchAllEvents = async () => {
  try {
    return await fetchTransformedEvents();
  } catch (err) {
    throw err;
  }
};

export const fetchFeaturedEvents = async () => {
  try {
    return await fetchTransformedEvents('orderBy="isFeatured"&equalTo=true');
  } catch (err) {
    throw err;
  }
};

export const fetchEventById = async (id: string) => {
  try {
    const events = await fetchTransformedEvents(
      `orderBy="$key"&equalTo="${id}"`
    );

    if (!events || events.length === 0) throw 'No Event Found';

    return events[0];
  } catch (err) {
    throw err;
  }
};

export const fetchFilteredEvents = async ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  try {
    const eventsByYear = await fetchTransformedEvents(
      `orderBy="dateObj/year"&equalTo=${year}`
    );
    if (!eventsByYear) throw 'No Events Found';
    const events = Array.isArray(eventsByYear) ? eventsByYear : [eventsByYear];
    return events.filter((event: EventObj) => event.dateObj.month === month);
  } catch (err) {
    throw err;
  }
};

export const fetchEventIds = async () => {
  try {
    const events = await fetchTransformedEvents();
    if (!events) throw 'No Events Found';
    return events.map(event => event.id);
  } catch (err) {
    throw err;
  }
};

export const fetchFeaturedEventIds = async () => {
  try {
    const featuredEvents = await fetchFeaturedEvents();
    if (!featuredEvents) throw 'No Events Found';
    return featuredEvents.map(event => event.id);
  } catch (err) {
    throw err;
  }
};
