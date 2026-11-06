import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export const findUser = (email) => User.findOne({ email }).lean();

export const findById = (id) => {
  if (!mongoose.isValidObjectId(id)) return null;
  return User.findById(id).lean();
};

export const getAll = () => User.find().lean();

export const updateById = (id, data) => {
  if (!mongoose.isValidObjectId(id)) return null;
  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();
};

export const removeById = (id) => {
  if (!mongoose.isValidObjectId(id)) return null;
  return User.findByIdAndDelete(id).lean();
};

export const create = async (user) => (await User.create(user))._id;
