import { User, Teacher ,Class,ClassSchedule} from "../models/index.js";
import * as ClassService from "../services/classService.js";

const createTeacher = async (userId, expertise, classId) => {
  try {
    const teacher = await Teacher.create({
      userId: userId,
      expertise: expertise,
      classId: classId,
    });
    if (classId) {
      ClassService.addTeacherToClass(classId, teacher.id);
    }
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

const updateTeacher = async (userId, updatedData) => {
  try {
    const teacher = await Teacher.findOne({ where: { userId: userId } });
    if (!teacher) {
      throw new Error("Teacher not found");
    }

    const updatedTeacher = await teacher.update(updatedData);

    return updatedTeacher;
  } catch (error) {
    throw error;
  }
};

const getClassScheduleOfTeacher = async (teacherId) => {
  try {
    const teacherWithSchedules = await Teacher.findByPk(teacherId, {
      include: [
        {
          model: Class,
          as: 'Classes',
          include: [
            {
              model: ClassSchedule,
              as: 'ClassSchedules',
            },
          ],
        },
      ],
    });

    if (!teacherWithSchedules) {
      return { status: 404, data: "Teacher not found" };
    }

    const teacherSchedules = teacherWithSchedules.Classes.map((cls) => {
      return {
        classId: cls.id,
        className: cls.name,
        classSchedules: cls.ClassSchedules.map((schedule) => ({
          scheduleId: schedule.id,
          ...schedule.toJSON(),
        })),
      };
    });

    return { status: 200, data: teacherSchedules };
  } catch (error) {
    console.error(error);
    return { status: 500, data: error.message };
  }
};

export {
  createTeacher,
  getAllTeachers,
  updateTeacher,
  getClassScheduleOfTeacher,
};
