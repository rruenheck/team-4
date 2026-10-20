import * as user from "../repository/user.js"


export const register = async ({ name, email, password }) => {

  if (await user.findUser(email)) {
    const err = new Error("Email already registered"); err.status = 409; throw err;
  }
  const id = await user.insert({ name, email, password });

  return { id, name, email }
}
