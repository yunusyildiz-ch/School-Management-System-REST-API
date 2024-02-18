import bcrypt from "bcrypt";
import User from "../models/user.js";
import * as AssistantService from "../services/assistantService.js";
import * as StaffService from "../services/staffService.js";
import * as StudentService from "../services/studentService.js";
import * as TeacherService from "../services/teacherService.js";

const createUser = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role,
    });

    switch (userData.role) {
      case "student":
        await StudentService.createStudent(newUser.id, userData.classId);
        break;
      case "teacher":
        await TeacherService.createTeacher(
          newUser.id,
          userData.expertise,
          userData.classId
        );
        break;
      case "assistant":
        await AssistantService.createAssistant(newUser.id, userData.expertise);
        break;
      case "staff":
        await StaffService.createStaff(newUser.id, userData.expertise);
        break;
      default:
        break;
    }

    return newUser;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const updateUser = async (userId, updatedUserData) => {
  try {
    if (updatedUserData.password) {
      updatedUserData.password = await bcrypt.hash(
        updatedUserData.password,
        10
      );
    }
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    switch (user.role) {
      case "student":
        await StudentService.updateStudent(user.id, updatedUserData);
        break;
      case "teacher":
        await TeacherService.updateTeacher(user.id, updatedUserData);
        break;
      case "assistant":
        await AssistantService.updateAssistant(user.id, updatedUserData);
        break;
      case "staff":
        await StaffService.updateStaff(user.id, updatedUserData);
        break;
      default:
        break;
    }

    const updatedUser = await user.update(updatedUserData);

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export { createUser, getAllUsers, getUserById, updateUser };
