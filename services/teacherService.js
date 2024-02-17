import { User, Teacher } from "../models/index.js";
import * as ClassService from "../services/classService.js";

const createTeacher = async (userId, expertise, classId) => {
  try {
    const teacher = await Teacher.create({
      userId: userId,
      expertise: expertise,
      classId: classId,
    });
    ClassService.addTeacherToClass(classId, teacher.id);
  } catch (error) {
    throw error;
  }
};

const getAllTeachers = async () => {
  try {
    const teachers = await User.findAll({
      include: {
        model: Teacher,
        attributes: ["id", "expertise"],
      },
      where: { role: "teacher" },
    });

    return teachers;
  } catch (error) {
    throw error;
  }
};

export { createTeacher, getAllTeachers };
