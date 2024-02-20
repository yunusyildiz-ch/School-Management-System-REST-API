import asyncHandler from 'express-async-handler';
import * as StudentService from '../services/studentService.js';



const getAllStudents = asyncHandler(async (req, res) => {
  const teachers = await StudentService.getAllStudents();
  res.status(200).json(teachers);
});

const getClassScheduleOfStudent = asyncHandler(async (req, res) => { 
  const { id } = req.params;
  const classSchedule = await StudentService.getClassScheduleOfStudent(id);
  res.status(200).json(classSchedule);
});

export { getAllStudents,getClassScheduleOfStudent };