import * as user from "../repository/user.js";

export const getAccount = async (id) => {
  const savedUser = await user.findById(id);
  if (!savedUser) return null;

  return {
    id: savedUser._id.toString(),
    name: savedUser.name,
    email: savedUser.email,
  };
};
