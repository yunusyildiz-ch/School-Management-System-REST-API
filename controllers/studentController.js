import asyncHandler from "express-async-handler";
import * as StudentService from "../services/studentService.js";
import { Student } from "../models/index.js";

const getAllStudents = asyncHandler(async (req, res) => {
  const teachers = await StudentService.getAllStudents();
  res.status(200).json(teachers);
});

const getClassOfStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classes = await StudentService.getClassOfStudent(id);
  res.status(200).json(classes);
});

const getTeachersOfStudent = asyncHandler(async(req, res) => {
  const { id } = req.params;
  const teachers = await StudentService.getTeachersOfStudent(id);
  res.status(200).json(teachers);
});

const getClassScheduleOfStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classSchedule = await StudentService.getClassScheduleOfStudent(id);
  res.status(200).json(classSchedule);
});

const updateStudent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const student = await Student.findByPk(id);
  const updatedStudent = await StudentService.updateStudent(
    student.userId,
    updatedData
  );
  res.status(200).json(updatedStudent);
});

const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await StudentService.deleteStudent(id);
  res.status(200).json(student);
});

export {
  getAllStudents,
  getClassOfStudent,
  getTeachersOfStudent,
  getClassScheduleOfStudent,
  updateStudent,
  deleteStudent,
};
