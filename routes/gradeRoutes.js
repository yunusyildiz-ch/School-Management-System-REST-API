import express from "express";
import * as GradeController from "../controllers/gradeController.js";
import passport from "../config/passport.js";
import {
  isAdminOrAssistant,
  isTeacher,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/:studentId/:assignmentId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  GradeController.addGrade
);

router.delete(
  "/:studentId/:assignmentId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  GradeController.removeGrade
);

router.get(
  "/:studentId/:assignmentId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  GradeController.getGrade
);

router.get(
  "/:studentId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  GradeController.getAllGradesOfStudent
);

router.put(
  "/:studentId/:assignmentId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  GradeController.updateGrade
);

export default router;
