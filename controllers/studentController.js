import asyncHandler from 'express-async-handler';
import * as StudentService from '../services/studentService.js';



const getAllStudents = asyncHandler(async (req, res) => {
  const teachers = await StudentService.getAllStudents();
  res.status(200).json(teachers);
});



export { getAllStudents };