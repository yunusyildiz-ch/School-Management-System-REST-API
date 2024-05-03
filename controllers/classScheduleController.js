import asyncHandler from "express-async-handler";
import * as ClassScheduleService from "../services/classScheduleService.js";

export const createClassSchedule = asyncHandler(async (req, res, next) => {
  const classScheduleData = req.body;
  console.log(req.body);

  const newClassSchedule = await ClassScheduleService.createClassSchedule(
    classScheduleData
  );

  res
    .status(201)
    .json({
      success: true,
      message: "Class Schedule Successfully Created.",
      newClassSchedule,
    });
});

export const assignClassScheduleToClassAndCreateAttendance = async (
  req,
  res
) => {
  const { classScheduleId, classId } = req.params;

  try {
    await ClassScheduleService.assignClassScheduleToClassAndCreateAttendance(
      classScheduleId,
      classId
    );
    res
      .status(200)
      .json({ message: "Class schedule successfully assigned to the class." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClassSchedule = asyncHandler (async(req, res,next) => {
  const classScheduleId = req.params.classScheduleId;
  const classScheduleData = req.body;

  try {
    const updatedClassSchedule = await ClassScheduleService.updateClassSchedule(
      classScheduleId,
      classScheduleData
    );

    res
    .status(200)
    .json({
        success: true,
        message: "Class Schedule Successfully Updated.",
        updatedClassSchedule,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


