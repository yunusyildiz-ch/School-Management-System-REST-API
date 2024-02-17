import asyncHandler from 'express-async-handler';
import * as studentService from '../services/studentService.js';



const getAllStudents = asyncHandler(async (req, res) => {
  const teachers = await studentService.getAllStudents();
  res.status(200).json(teachers);
});


export { getAllStudents };