import asyncHandler from "express-async-handler";
import * as TeacherService from "../services/teacherService.js";

const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await TeacherService.getAllTeachers();
  res.status(200).json(teachers);
});

const getClassScheduleOfTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classSchedule = await TeacherService.getClassScheduleOfTeacher(id);
  res.status(200).json(classSchedule);
});

export { getAllTeachers, getClassScheduleOfTeacher };
