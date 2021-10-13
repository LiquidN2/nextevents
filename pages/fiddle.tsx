import { NextPage } from 'next';
import { fetchAllEvents, fetchFilteredEvents } from '../data/model';

const Fiddle: NextPage = () => {
  // fetch(
  //   'https://nextevents-1d0a5-default-rtdb.asia-southeast1.firebasedatabase.app/events.json'
  // )
  //   .then(response => response.json())
  //   .then(data => console.log(data));
  //
  // fetchAllEvents().then(events => console.log(events));

  return (
    <>
      <div>TEST</div>
    </>
  );
};

export default Fiddle;

export const getServerSideProps = async () => {
  fetchFilteredEvents({ year: 2021, month: 4 }).then(events =>
    console.log(events)
  );

  return { props: { id: '' } };
};
