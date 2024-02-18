import asyncHandler from "express-async-handler";
import Class from "../models/class.js";
import * as classService from "../services/classService.js";

const createClass = asyncHandler(async (req, res) => {
  const classData = req.body;
  console.log(req.body);

  const newClass = await classService.createClass(classData);

  res.status(201).json(newClass);
});

const getClasses = asyncHandler(async (req, res) => {
  const classes = await classService.getClasses();
  res.status(200).json(classes);
});

const getClassById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const cls = await classService.getClassById(id);
  res.status(200).json(cls);
});

const updateClass = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const classData = req.body;
  const updatedClass = await classService.updateClass(id, classData);
  const successMessage = "Class successfully updated.";
  const note = "The class information has been updated in the database.";

  res
    .status(200)
    .json({ success: true, message: successMessage, note: note, updatedClass });
});

const deleteClass = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deletedClass = await classService.deleteClass(id);
  const successMessage = "Class successfully deleted.";
  const note = "The class has been permanently deleted from the database.";

  res
    .status(200)
    .json({ success: true, message: successMessage, note: note, deletedClass });
});

const addTeacherToClass = asyncHandler(async (req, res) => {
  const { id, teacherId } = req.params;
  const updatedClass = await classService.addTeacherToClass(id, teacherId);
  const successMessage = "Teacher successfully added to Class.";

  res
    .status(200)
    .json({ success: true, message: successMessage, updatedClass });
});

const addStudentToClass = asyncHandler(async (req, res) => {
  const { id, studentId } = req.params;
  const updatedClass = await classService.addStudentToClass(id, studentId);
  const successMessage = "Student successfully added to Class.";
  res
    .status(200)
    .json({ success: true, messages: successMessage, updatedClass });
});

const getTeachersOfClass = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const teachers = await classService.getTeachersOfClass(id);
  res.status(200).json(teachers);
});

const getStudentsOfClass = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const students = await classService.getStudentsOfClass(id);
  res.status(200).json(students);
});

const removeTeacherFromClass = asyncHandler(async (req, res) => {
  const { id, teacherId } = req.params;
  const updatedClass = await classService.removeTeacherFromClass(id, teacherId);
  const successMessage = "Teacher successfully removed from Class.";
  res
    .status(200)
    .json({ success: true, message: successMessage, updatedClass });
});

const removeStudentFromClass = asyncHandler(async (req, res) => {
  const { id, studentId } = req.params;
  const updatedClass = await classService.removeStudentFromClass(id, studentId);
  const successMessage = "Student successfully removed from Class.";
  res
    .status(200)
    .json({ success: true, message: successMessage, updatedClass });
});

export {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
  addTeacherToClass,
  addStudentToClass,
  getTeachersOfClass,
  getStudentsOfClass,
  removeTeacherFromClass,
  removeStudentFromClass,
};
