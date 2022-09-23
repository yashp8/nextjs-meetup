import MeetupList from '../components/meetups/MeetupList';
import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import { MongoClient } from 'mongodb';

const DUMMY_MEETUP = [
  {
    id: 'm1',
    title: 'A first meetup',
    image:
      'https://addicted2success.com/wp-content/uploads/2018/06/8-Reasons-You-Should-Join-a-Meetup-Group-Today.jpg',
    address: 'Some address, abc, xyz',
    description: 'meet up desc',
  },
  {
    id: 'm2',
    title: 'A second meetup',
    image:
      'https://addicted2success.com/wp-content/uploads/2018/06/8-Reasons-You-Should-Join-a-Meetup-Group-Today.jpg',
    address: 'Some address, abc, xyz 123',
    description: 'meet up desc',
  },
];

export async function getStaticProps() {
  // fetch data from api
  const client = await MongoClient.connect('<MONGODB>');
  const db = client.db();
  const meetupsCollection = db.collection('meetupsdata');
  const result = await meetupsCollection.find().toArray();
  console.log(result);
  client.close();

  return {
    props: {
      meetups: result.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 5,
  };
}

export default function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}
