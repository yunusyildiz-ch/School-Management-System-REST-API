import express from "express";
import passport from "../config/passport.js";
import * as TeacherController from "../controllers/teacherController.js";
import {
  isAdminOrAssistant,
  isTeacher,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  TeacherController.getAllTeachers
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),isAdminOrAssistant || isTeacher,
  TeacherController.getClassOfTeacher
);


router.get(
  "/:id/class-schedule",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  TeacherController.getClassScheduleOfTeacher
);

export default router;
