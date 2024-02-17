import asyncHandler from 'express-async-handler';
import * as teacherService from '../services/teacherService.js';



const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await teacherService.getAllTeachers();
  res.status(200).json(teachers);
});

export { getAllTeachers };
