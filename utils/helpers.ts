import { EventObj, EventsObj } from '../types/events';

export const formatDate: (date: string) => string = date =>
  new Date(date).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const formatAddress: (address: string) => string = address =>
  address.replace(', ', '\n');

// interface EventObjInFirebase {
//   date: string;
//   description: string;
//   image: string;
//   location: string;
//   title: string;
//   isFeatured: boolean;
//   dateObj: { date: number; month: number; year: number };
// }
//
// export interface EventObj extends EventObjInFirebase {
//   id: string;
// }
//
// interface EventsObj {
//   [key: string]: EventObjInFirebase;
// }

export const transformEventsData: (eventsObj: EventsObj) => EventObj[] =
  eventsObj => {
    const arr = [];

    for (let key in eventsObj) {
      arr.push({
        id: key,
        ...eventsObj[key],
      });
    }

    return arr;
  };

export const isValidEmail = (email: string) => {
  const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return emailPattern.test(email);
};
