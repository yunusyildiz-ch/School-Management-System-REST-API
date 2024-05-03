import express from "express";
import passport from "../config/passport.js";
import {
  isAdminOrAssistant,
  isAdminOrAssistantOrTeacher,
  isTeacher,
} from "../middlewares/authMiddleware.js";
import reportController from "../controllers/reportController.js";

const router = express.Router();

router.get(
  "/attendance-report/:classId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistantOrTeacher,
  reportController.downloadAttendanceReport
);

router.get(
  "/grades-report/assignment/:assignmentId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistantOrTeacher,
  reportController.downloadGradesReportForAssignment
);

export default router;
