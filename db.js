import { MongoClient } from "mongodb";
import "dotenv/config";

let client;
let db;

export async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is undefined. Check that your .env file exists and contains this key.",
    );
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    db = client.db("user");
    return client;
  } catch (err) {
    console.dir(err);
    throw err;
  }
}

export const getDb = () => db;

export async function disconnectFromMongoDB() {
  if (client) {
    await client.close();
  }
}
