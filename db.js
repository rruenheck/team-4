import mongoose from "mongoose";
import "dotenv/config";

export async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is undefined. Check that your .env file exists and contains this key.",
    );
  }
  await mongoose.connect(uri, { dbName: "user" });
  console.log("You successfully connected to MongoDB!");
  return mongoose.connection;
}

export async function disconnectFromMongoDB() {
  await mongoose.disconnect();
}
