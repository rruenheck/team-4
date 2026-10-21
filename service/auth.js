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

export const login = async ({ name, email, password }) => {
  const savedUser = await user.findUser(email);
  if (!savedUser){
    const err = new Error("Email not registered"); err.status = 401; throw err;
  }
  const passwordValidation = await bcrypt.compare(password, savedUser.passwordHash);
  if (!passwordValidation){
    const err = new Error("Invalid password"); err.status = 401; throw err;
  }
  return {id: savedUser.id, name: savedUser.name, email: savedUser.email}
}
