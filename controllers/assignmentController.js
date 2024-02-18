import * as AssignmentService from "../services/assignmentService.js";
import asyncHandler from "express-async-handler";

const createAssignment = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const assignment = await AssignmentService.createAssignment(req.body);
  res.status(201).json({
    success: true,
    message: "Assignment Successfully Created.",
    assignment,
  });
});

const getAllAssignments = asyncHandler(async (req, res, next) => {
  const assignments = await AssignmentService.getAllAssignments();
  res.status(200).json(assignments);
});

const getAssignmentById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const assignment = await AssignmentService.getAssignmentById(id);
  res.status(200).json(assignment);
});

const updateAssignment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const assignment = await AssignmentService.updateAssignment(id, req.body);
  res
    .status(200)
    .json({
      success: true,
      message: "Assignment Successfully Updated.",
      assignment,
    });
});

const deleteAssignment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const deletedAssignment = await AssignmentService.deleteAssignment(id);
  res.status(200).json({
    success: true,
    message: "Assignment Successfully Deleted.",
    deletedAssignment,
  });
});
export {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
