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

export const updateName = async (id, loggedInUserId, name) => {
  if (id !== loggedInUserId) {
    const err = new Error("You cannot edit another person's account");
    err.status = 403;
    throw err;
  }

  if (typeof name !== "string" || !name.trim()) {
    const err = new Error("Display name is required");
    err.status = 400;
    throw err;
  }

  const trimmedName = name.trim();

  const updatedUser = await user.updateById(id, {
    name: trimmedName,
  });

  if (!updatedUser) {
    const err = new Error("Account not found");
    err.status = 404;
    throw err;
  }
};
