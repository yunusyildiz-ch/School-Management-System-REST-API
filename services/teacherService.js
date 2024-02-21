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

const getClassOfTeacher = async (id) => {
  try {
  const teacher = await Teacher.findByPk(id);
  if (!teacher) {
    return { status: 404, message: "Teacher not found" };
  }
  const classes = teacher.getClasses();

    return classes;
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


const deleteTeacher = async (id) => {
  try {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return { status: 404, message: "Teacher not found" };
    }

    const user = await User.findByPk(teacher.userId);
    if (!user) {
      return { status: 404, message: "Associated user account not found" };
    }

    await user.destroy();

    return {
      status: 200,
      message: "Teacher and associated user account successfully deleted",
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: "An error occurred while deleting the teacher",
    };
  }
};



export {
  createTeacher,
  getAllTeachers,
  updateTeacher,
  getClassOfTeacher,
  getClassScheduleOfTeacher,
  deleteTeacher,
};
