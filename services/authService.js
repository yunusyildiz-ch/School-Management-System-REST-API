import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import * as AssistantService from "../services/assistantService.js";
import * as StaffService from "../services/staffService.js";
import * as StudentService from "../services/studentService.js";
import * as TeacherService from "../services/teacherService.js";

export const registerUser = async (userData) => {
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

export const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });
    return token;
  } catch (error) {
    throw error;
  }
};
