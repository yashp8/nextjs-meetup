import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

export default function NewMeetup() {
  const router = useRouter();

  const addMeetupHandler = async (meetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    router.push('/');
  };
  return <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>;
}
