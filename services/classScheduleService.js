import ClassSchedule from "../models/classSchedule.js";
import Class from "../models/class.js";

export const createClassSchedule = async (classScheduleData) => {
  return ClassSchedule.create({
    classId: classScheduleData.classId,
    startTime: classScheduleData.startTime,
    endTime: classScheduleData.endTime,
  });
};

export const assignClassScheduleToClass = async (classScheduleId, classId) => {
  const result = await ClassSchedule.update(
    { classId },
    { where: { id: classScheduleId } }
  );
  if (result[0] === 0)
    throw new Error("ClassSchedule not found or Class not found");
  return result;
};
