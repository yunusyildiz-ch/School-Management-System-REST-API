import asyncHandler from "express-async-handler";
import Class from "../models/class.js";
import * as classService from "../services/classService.js";

export const createClass = asyncHandler(async (req, res) => {
  const classData = req.body;
  console.log(req.body);

  const newClass = await classService.createClass(classData);

  res.status(201).json(newClass);
});


