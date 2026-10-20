import { getDb } from "../db.js"

const users = () => getDb().collection("users")


export const findUser = (email) => users().findOne({ email })

export const insert = async (user) => (await users().insertOne(user)).insertedId;
