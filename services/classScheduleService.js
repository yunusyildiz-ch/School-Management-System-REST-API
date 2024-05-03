import { ClassSchedule } from "../models/index.js";
import { assignScheduleToClassTeachers } from "../utils/utils.js";

import { createAttendanceRecordsForSchedule,updateAttendancesForUpdatedClassSchedule } from "./attendanceService.js";

export const createClassSchedule = async (classScheduleData) => {
  return ClassSchedule.create({
    title: classScheduleData.title,
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

  await assignScheduleToClassTeachers(classScheduleId, classId);
  return {
    message: "Class schedule assigned and attendance records created.",
  };
};

export const updateClassSchedule = async (
  classScheduleId,
  classScheduleData
) => {
  try {
    const classSchedule = await ClassSchedule.findByPk(classScheduleId);
    const updatedClassSchedule = await classSchedule.update(classScheduleData);

  
    await updateAttendancesForUpdatedClassSchedule(classScheduleId, new Date());

    return updatedClassSchedule;
  } catch (error) {
    console.error(error);
  }
};

