import Student from "../models/student.js";
import User from "../models/user.js";
import Class from '../models/class.js'
import ClassSchedule from "../models/classSchedule.js";
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

const getClassScheduleOfStudent = async (studentId) => {
  try {
   
    const studentWithClassesAndSchedules = await Student.findByPk(studentId, {
      include: [{
        model: Class, 
        as: 'Classes', 
        include: [{
          model: ClassSchedule, 
          as: 'ClassSchedules' 
        }]
      }]
    });

    if (!studentWithClassesAndSchedules) {
      return { status: 404, message: "Student not found" };
    }

  
    const schedules = studentWithClassesAndSchedules.Classes.reduce((acc, cls) => {
      const clsSchedules = cls.ClassSchedules.map(schedule => ({
        classId: cls.id,
        scheduleId: schedule.id,
        ...schedule.toJSON() 
      }));
      return acc.concat(clsSchedules);
    }, []);

    if (schedules.length === 0) {
      return { status: 404, message: "No class schedules found for this student" };
    }

    return { status: 200, data: schedules };
  } catch (error) {
    console.error(error.message);
    return { status: 500, message: error.message };
  }
};


export { createStudent, getAllStudents, getClassScheduleOfStudent };
