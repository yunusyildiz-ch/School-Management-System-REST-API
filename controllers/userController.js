import asyncHandler from "express-async-handler";
import * as UserService from "../services/userService.js";

const createUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await UserService.getAllUsers();
  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await UserService.getUserById(id);
  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await UserService.updateUser(id, req.body);
  res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await UserService.deleteUser(id);
  res.status(200).json(user);
})

export { createUser, getAllUsers, getUserById, updateUser,deleteUser };
