import Assignment from "../models/assignment.js";

const createAssignment = async (assignmentData) => {
  const newAssignment = await Assignment.create(assignmentData);
  return newAssignment;
};

const getAllAssignments = async (req, res, next) => {
  const assignments = await Assignment.findAll();
  return assignments;
};

const getAssignmentById = async (id) => {
  const assignment = await Assignment.findByPk(id);
return assignment;
};
const updateAssignment = async (assignmentId, assignmentData) => {
  const assignment = await Assignment.findByPk(assignmentId);
  if (!assignment) {
    throw new Error('Assignment Not Found.');
  }
  Object.assign(assignment, assignmentData);
  await assignment.save();
  return assignment; 
};

const deleteAssignment = async (id) => {
  const existingAssignment = await Assignment.findByPk(id);
  if (!existingAssignment) {
    throw new Error("Assignment not found");
  }
  await existingAssignment.destroy();
  return existingAssignment;
};

export {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
