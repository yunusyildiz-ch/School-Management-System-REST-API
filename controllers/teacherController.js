import asyncHandler from "express-async-handler";
import { Teacher } from "../models/index.js";
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

const getStudentsOfTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const students = await TeacherService.getStudentsOfTeacher(id);
  res.status(200).json(students);
});

const getClassSchedulesOfTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classSchedule = await TeacherService.getClassSchedulesOfTeacher(id);
  res.status(200).json(classSchedule);
});

const removeClassScheduleOfTeacher = asyncHandler(async (req, res, next) => {
  const { id, classScheduleId } = req.params;
  const result = await TeacherService.removeClassScheduleOfTeacher(
    id,
    classScheduleId
  );

  if (result.status && result.status !== 200) {
    return res
      .status(result.status)
      .json({ success: false, message: result.message });
  }

  res.json({ success: true, message: result.message });
});

const updateTeacher = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const teacher = await Teacher.findByPk(id);
  const updatedTeacher = await TeacherService.updateTeacher(
    teacher.userId,
    updatedData
  );
  res.status(200).json(updatedTeacher);
});

const deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const teacher = await TeacherService.deleteTeacher(id);
  res.status(200).json(teacher);
});

export {
  getAllTeachers,
  getClassOfTeacher,
  getStudentsOfTeacher,
  getClassSchedulesOfTeacher,
  removeClassScheduleOfTeacher,
  updateTeacher,
  deleteTeacher,
};
