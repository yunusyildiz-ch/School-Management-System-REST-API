import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import generateToken from "../utils/utils.js";


export const registerUser = async (userData) => {
  try {
    console.log(userData);

    const userExists = await User.findOne({ where: { email: userData.email } });

    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });
   

    return {
      ...user.toJSON(),
      token: generateToken(user),
    };
  } catch (error) {
    throw error;
  }
};

export const authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return {
      ...user.toJSON(),
      token: generateToken(user),
    };
  } catch (error) {
    throw error;
  }
};