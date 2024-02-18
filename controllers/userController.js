import asyncHandler from 'express-async-handler';
import * as UserService from '../services/userService.js'

 const createUser = async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      const { name, email, password, role, expertise, classId } = req.body;
      const newUser = await UserService.createUser({
        name,
        email,
        password,
        role,
        expertise,
        classId,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const getAllUsers = asyncHandler (async(req, res, next)=>{
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  })



  export {createUser, getAllUsers}