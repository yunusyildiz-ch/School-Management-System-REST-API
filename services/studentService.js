import Student from "../models/student.js";
import * as ClassService from "../services/classService.js";

const createStudent = async (userId, classId) => {
  try {
    const student = await Student.create({ userId: userId });

    ClassService.addStudentToClass(classId, student.id);
  } catch (error) {
    throw error;
  }
};

export { createStudent };
