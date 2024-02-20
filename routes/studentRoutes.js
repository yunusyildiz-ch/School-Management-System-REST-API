import express from "express";
import passport from "../config/passport.js";
import * as StudentController from "../controllers/studentController.js";
import {
  isAdminOrAssistant,
  isTeacher,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  StudentController.getAllStudents
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  StudentController.getClassOfStudent
);

router.get('/:id/class-schedule',passport.authenticate("jwt", { session: false }),StudentController.getClassScheduleOfStudent)

export default router;
