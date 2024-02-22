import express from "express";
import passport from "../config/passport.js";
import * as TeacherController from "../controllers/teacherController.js";
import {
  isAdminOrAssistantOrTeacher,
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
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  TeacherController.getClassOfTeacher
);

router.get(
  "/:id/student",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  TeacherController.getStudentsOfTeacher
);

router.get(
  "/:id/class-schedule",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistantOrTeacher,
  TeacherController.getClassSchedulesOfTeacher
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant,
  TeacherController.updateTeacher
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant,
  TeacherController.deleteTeacher
);

export default router;
