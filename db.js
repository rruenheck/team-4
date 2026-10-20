import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri);

let db;

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    db = client.db("user")
    return client;
  } catch (err) {
    console.dir(err);
  }
}
export const getDb = () => db;

export async function disconnectFromMongoDB() {
  await client.close();
}
