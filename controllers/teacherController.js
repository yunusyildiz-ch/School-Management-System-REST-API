import asyncHandler from "express-async-handler";
import * as TeacherService from "../services/teacherService.js";

const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await TeacherService.getAllTeachers();
  res.status(200).json(teachers);
});

const getClassOfTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classes = await TeacherService.getClassOfTeacher(id);
  res.status(200).json(classes);
});

const getClassScheduleOfTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classSchedule = await TeacherService.getClassScheduleOfTeacher(id);
  res.status(200).json(classSchedule);
});

const deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const teacher = await TeacherService.deleteTeacher(id);
  res.status(200).json(teacher);
})

export { getAllTeachers,getClassOfTeacher,getClassScheduleOfTeacher,deleteTeacher };
