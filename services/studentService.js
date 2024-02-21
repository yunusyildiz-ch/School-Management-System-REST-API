import Student from "../models/student.js";
import {
  User,
  Class,
  Attendance,
  ClassSchedule,
  Grade,
} from "../models/index.js";
import * as ClassService from "../services/classService.js";

const createStudent = async (userId, classId) => {
  try {
    const student = await Student.create({ userId: userId });
    if (classId) {
      await ClassService.addStudentToClass(classId, student.id);
    }
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

const getClassOfStudent = async (id) => {
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return { status: 404, message: "Student not found" };
    }
    const classes = student.getClasses();

    return classes;
  } catch (error) {
    throw error;
  }
};

const getClassScheduleOfStudent = async (studentId) => {
  try {
    const studentWithClassesAndSchedules = await Student.findByPk(studentId, {
      include: [
        {
          model: Class,
          as: "Classes",
          include: [
            {
              model: ClassSchedule,
              as: "ClassSchedules",
            },
          ],
        },
      ],
    });

    if (!studentWithClassesAndSchedules) {
      return { status: 404, message: "Student not found" };
    }

    const schedules = studentWithClassesAndSchedules.Classes.reduce(
      (acc, cls) => {
        const clsSchedules = cls.ClassSchedules.map((schedule) => ({
          classId: cls.id,
          scheduleId: schedule.id,
          ...schedule.toJSON(),
        }));
        return acc.concat(clsSchedules);
      },
      []
    );

    if (schedules.length === 0) {
      return {
        status: 404,
        message: "No class schedules found for this student",
      };
    }

    return { status: 200, data: schedules };
  } catch (error) {
    console.error(error.message);
    return { status: 500, message: error.message };
  }
};

const updateStudent = async (userId, updatedData) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("Student not found");
    }

    const updatedStudent = await user.update(updatedData);

    return updatedStudent;
  } catch (error) {
    throw error;
  }
};



const deleteStudent = async (id) => {
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return { status: 404, message: "Student not found" };
    }

    await Attendance.destroy({
      where: { studentId: id },
    });

    await Grade.destroy({
      where: { studentId: id },
    });

    const user = await User.findByPk(student.userId);
    if (!user) {
      return { status: 404, message: "Associated user account not found" };
    }

    await user.destroy();

    return {
      status: 200,
      message: "Student and associated user account successfully deleted",
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: "An error occurred while deleting the student",
    };
  }
};

export {
  createStudent,
  getAllStudents,
  getClassOfStudent,
  getClassScheduleOfStudent,
  updateStudent,
  deleteStudent,
};
