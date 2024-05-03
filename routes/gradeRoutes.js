import express from "express";
import * as GradeController from "../controllers/gradeController.js";
import passport from "../config/passport.js";
import {
  isAdminOrAssistant,
  isTeacher,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/student/:studentId/assignment/:assignmentId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  GradeController.addGrade
);

router.delete(
  "/student/:studentId/assignment/:assignmentId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  GradeController.removeGrade
);

router.get(
  "/student/:studentId/assignment/:assignmentId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  GradeController.getGrade
);

router.get(
  "/student/:studentId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  GradeController.getAllGradesOfStudent
);

router.put(
  "/student/:studentId/assignment/:assignmentId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  GradeController.updateGrade
);

export default router;
