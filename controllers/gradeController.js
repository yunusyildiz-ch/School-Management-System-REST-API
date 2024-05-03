import asyncHandler from "express-async-handler";
import * as GradeService from "../services/gradeService.js";

export const addGrade = asyncHandler(async (req, res) => {
  const { studentId, assignmentId } = req.params;
  const { grade } = req.body;

  try {
    const updatedGrade = await GradeService.addGrade(
      studentId,
      assignmentId,
      grade
    );

    res.status(200).json({
      success: true,
      message: "Grade successfully updated for the assignment.",
      data: updatedGrade,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export const removeGrade = asyncHandler(async (req, res) => {
  const { studentId, assignmentId } = req.params;

  try {
    await GradeService.removeGrade(studentId, assignmentId);
    res.status(200).json({
      success: true,
      message: "Grade successfully removed",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export const getGrade = asyncHandler(async (req, res) => {
  const { studentId, assignmentId } = req.params;
  try {
    const grades = await GradeService.getGrade(studentId, assignmentId);
    res.status(200).json(grades);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export const getAllGradesOfStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  try {
    const grades = await GradeService.getAllGradesOfStudent(studentId);
    res.status(200).json(grades);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const updateGrade = asyncHandler(async (req, res) => {
  const { studentId, assignmentId } = req.params;
  const { grade } = req.body;
  const updatedGrade = await GradeService.updateGrade(
    studentId,
    assignmentId,
    grade
  );
  res.status(200).json({
    success: true,
    message: "Grade successfully updated for the assignment.",
    data: updatedGrade,
  });
});
