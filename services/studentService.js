import Student from "../models/student.js";
import User from "../models/user.js";
import * as ClassService from "../services/classService.js";

const createStudent = async (userId, classId) => {
  try {
    const student = await Student.create({ userId: userId });

    ClassService.addStudentToClass(classId, student.id);
  } catch (error) {
    throw error;
  }
};

const getAllStudents = async () => {
  try {
    const students = await User.findAll({
      include: {
        model: Student,
        attributes: ["id", "userId"],
      },
      where: { role: "student" },
    });

    return students;
  } catch (error) {
    throw error;
  }
};

const updateStudent = async (userId, updatedData) => {
  try {
    const student = await Student.findOne({ where: { userId: userId } });
    if (!student) {
      throw new Error("Student not found");
    }

    const updatedStudent = await student.update(updatedData);

    return updatedStudent;
  } catch (error) {
    throw error;
  }
};

export { createStudent, getAllStudents, updateStudent };
