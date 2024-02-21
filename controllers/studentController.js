import asyncHandler from "express-async-handler";
import * as StudentService from "../services/studentService.js";

const getAllStudents = asyncHandler(async (req, res) => {
  const teachers = await StudentService.getAllStudents();
  res.status(200).json(teachers);
});

const getClassOfStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classes = await StudentService.getClassOfStudent(id);
  res.status(200).json(classes);
});

const getClassScheduleOfStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classSchedule = await StudentService.getClassScheduleOfStudent(id);
  res.status(200).json(classSchedule);
});

const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await StudentService.deleteStudent(id);
  res.status(200).json(student);
})

export { getAllStudents, getClassOfStudent, getClassScheduleOfStudent,deleteStudent };
