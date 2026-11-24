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

const isAdmin = async (id) => {
  const actor = await user.findById(id);
  return actor?.role?.admin === true;
};

const isOwnerOrAdmin = async (account, id) => {
  if (account._id.toString() === id) return true;
  return isAdmin(id);
};

const accountNotFound = () => {
  const err = new Error("Account not found");
  err.status = 404;
  return err;
};

export const updateName = async (id, loggedInUserId, name) => {
  const account = await user.findById(id);
  if (!account) throw accountNotFound();

  if (!(await isOwnerOrAdmin(account, loggedInUserId))) {
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

  if (!updatedUser) throw accountNotFound();
};

export const makeAdmin = async (id, loggedInUserId) => {
  if (!(await isAdmin(loggedInUserId))) {
    const err = new Error("Only admins can grant admin access");
    err.status = 403;
    throw err;
  }

  const updatedUser = await user.updateById(id, { "role.admin": true });

  if (!updatedUser) throw accountNotFound();

  return updatedUser;
};
