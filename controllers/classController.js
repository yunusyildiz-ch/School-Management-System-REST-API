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

const updateClass = asyncHandler(async(req,res)=>{
  const id = req.params.id;
  const classData = req.body;
  const updatedClass = await classService.updateClass(id,classData);
  res.status(200).json(updatedClass)
})

export { createClass, getClasses, getClassById ,updateClass};
