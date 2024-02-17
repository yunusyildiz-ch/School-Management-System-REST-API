import asyncHandler from "express-async-handler";
import Class from "../models/class.js";
import * as  classService from "../services/classService.js";

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

export  { createClass, getClasses };
