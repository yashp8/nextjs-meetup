import { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';

export async function getStaticPaths() {
  const client = await MongoClient.connect('<MONGODB>');
  const db = client.db();
  const meetupsCollection = db.collection('meetupsdata');
  const result = await meetupsCollection.find({}, { _id: 1 }).toArray();
  const result1 = await meetupsCollection.find({ _id: 1 });
  console.log('ids' + result1);
  client.close();

  return {
    fallback: false,
    paths: result.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log('MID' + meetupId);
  const client = await MongoClient.connect('<MONGODB>');
  const db = client.db();
  const meetupsCollection = db.collection('meetupsdata');
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  console.log('single' + JSON.stringify(meetup));
  client.close();

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
      },
    },
  };
}

export default function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}
