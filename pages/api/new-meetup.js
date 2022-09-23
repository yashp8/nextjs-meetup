import { MongoClient } from 'mongodb';

// /api/new-meetup

export default async function handler(req, res) {
  try {
    // console.log(req);
    if (req.method === 'POST') {
      const data = req.body;
      const client = await MongoClient.connect('<MONGODB>');
      const db = client.db();
      const meetupsCollection = db.collection('meetupsdata');
      const result = await meetupsCollection.insertOne(data);
      console.log(result);
      client.close();
      res.status(201).json({ mssage: 'Meetups inserted' });
    }
  } catch (error) {
    console.log(error);
  }
}
