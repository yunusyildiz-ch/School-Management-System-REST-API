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



