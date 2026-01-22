import { UserModel } from "../../DB/model/user.model.js";

export const signup = async (userData) => {
  const existingUser = await UserModel.findOne({
    where: { email: userData.email },
  });
  if (existingUser) {
    return { status: 409, message: "Email already exists." };
  }

  const newUser = UserModel.build(userData);
  await newUser.save();
  return { status: 201, message: "User added successfully." };
};

export const upsertUser = async (id, userData) => {
  await UserModel.upsert({ id, ...userData }, { validate: false });
  return { status: 200, message: "User created or updated successfully" };
};

export const getUserByEmail = async (email) => {
  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    return { status: 404, message: "no user found" };
  }
  return { status: 200, user };
};

export const getUserById = async (id) => {
  const user = await UserModel.findByPk(id, {
    attributes: { exclude: ["role"] },
  });
  if (!user) {
    return { status: 404, message: "no user found" };
  }
  return { status: 200, user };
};
