import bcrypt from "bcrypt"
import * as user from "../repository/user.js"


export const register = async ({ name, email, password }) => {

  if (await user.findUser(email)) {
    const err = new Error("Email already registered"); err.status = 409; throw err;
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const id = await user.insert({ name, email, passwordHash });

  return { id, name, email }
}
