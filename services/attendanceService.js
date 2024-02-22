import { differenceInCalendarDays, addDays, format } from "date-fns";
import { Class, Student, ClassSchedule, Attendance } from "../models/index.js";
import { Op } from "sequelize";

export const createAttendanceRecordsForSchedule = async (
  classScheduleId,
  classId
) => {
  const classSchedule = await ClassSchedule.findByPk(classScheduleId);
  if (!classSchedule) throw new Error("ClassSchedule not found");

  const students = await Class.findByPk(classId).then((c) => c.getStudents());
  if (students.length === 0) throw new Error("No students found in class");

  const startDate = new Date(classSchedule.startDate);
  const endDate = new Date(classSchedule.endDate);
  const totalDays = differenceInCalendarDays(endDate, startDate);

  for (let day = 0; day <= totalDays; day++) {
    const currentDate = addDays(startDate, day);
    if (
      classSchedule.daysOfWeek
        .split(",")
        .includes(currentDate.getDay().toString())
    ) {
      for (const student of students) {
        const dateStr = format(currentDate, "yyyy-MM-dd");
        const [existingAttendance, created] = await Attendance.findOrCreate({
          where: {
            studentId: student.id,
            classScheduleId,
            date: dateStr,
          },
          defaults: {
            status: false,
          },
        });
      }
    }
  }
};

export const updateAttendancesForUpdatedClassSchedule = async (
  classScheduleId,
  newStartDate
) => {
  const classSchedule = await ClassSchedule.findByPk(classScheduleId, {
    include: [
      {
        model: Class,
        include: [Student],
      },
    ],
  });

  if (!classSchedule) {
    throw new Error("ClassSchedule not found");
  }

  const { Class: relatedClass } = classSchedule;

  const futureAttendances = await Attendance.findAll({
    where: {
      classScheduleId: classScheduleId,
      date: {
        [Op.gte]: new Date(newStartDate),
      },
    },
  });

  await Promise.all(futureAttendances.map((att) => att.destroy()));

  const students = await relatedClass.getStudents();
  if (students.length === 0) throw new Error("No students found in class");

  const startDate = new Date(classSchedule.startDate);
  const endDate = new Date(classSchedule.endDate);
  const totalDays = differenceInCalendarDays(endDate, startDate);

  for (let day = 0; day <= totalDays; day++) {
    const currentDate = addDays(startDate, day);
    if (
      classSchedule.daysOfWeek
        .split(",")
        .includes(currentDate.getDay().toString())
    ) {
      for (const student of students) {
        const dateStr = format(currentDate, "yyyy-MM-dd");
        const [existingAttendance, created] = await Attendance.findOrCreate({
          where: {
            studentId: student.id,
            classScheduleId,
            date: dateStr,
          },
          defaults: {
            status: false,
          },
        });
      }
    }
  }
};
