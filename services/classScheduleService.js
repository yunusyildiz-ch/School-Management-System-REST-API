import ClassSchedule from "../models/classSchedule.js";
import Class from "../models/class.js";
import Student from "../models/student.js";
import Attendance from "../models/attendance.js";
import { createAttendanceRecordsForSchedule } from "./attendanceService.js";

export const createClassSchedule = async (classScheduleData) => {
  return ClassSchedule.create({
    classId: classScheduleData.classId,
    startDate: classScheduleData.startDate,
    endDate: classScheduleData.endDate,
    daysOfWeek: classScheduleData.daysOfWeek,
  });
};

export const assignClassScheduleToClassAndCreateAttendance = async (
  classScheduleId,
  classId
) => {
  const classSchedule = await ClassSchedule.findByPk(classScheduleId);
  if (!classSchedule) throw new Error("ClassSchedule not found");

  if (Number(classSchedule.classId) === Number(classId)) {
    throw new Error("This ClassSchedule is already assigned to this class.");
  }

  await ClassSchedule.update({ classId }, { where: { id: classScheduleId } });

  await createAttendanceRecordsForSchedule(classScheduleId, classId);

  return {
    message: "Class schedule assigned and attendance records created.",
  };
};
