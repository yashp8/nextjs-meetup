import { MongoClient } from 'mongodb';

// /api/new-meetup

export default async function handler(req, res) {
  try {
    // console.log(req);
    if (req.method === 'GET') {
      const client = await MongoClient.connect(`<MONGODB>`);
      const db = client.db();
      const meetupsCollection = db.collection('meetupsdata');
      const result = await meetupsCollection.find();
      console.log(result);
      client.close();
      res.status(200).json({ mssage: 'Meetups read' });
    }
  } catch (error) {
    console.log(error);
  }
}
