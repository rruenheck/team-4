import { getDb } from "../db.js";
import { ObjectId } from "mongodb";

const users = () => getDb().collection("users");

export const findUser = (email) => users().findOne({ email });

export const findUserById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return users().findOne({ _id: new ObjectId(id) });
};

export const insert = async (user) =>
  (await users().insertOne(user)).insertedId;
