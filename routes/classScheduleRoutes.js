import express from "express";
import passport from "../config/passport.js";
import {
  isAdminOrAssistant,
  isTeacher,
} from "../middlewares/authMiddleware.js";
import * as ClassScheduleController from "../controllers/classScheduleController.js";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  ClassScheduleController.createClassSchedule
);

router.post('/:classScheduleId/:classId',passport.authenticate("jwt", { session: false }),isAdminOrAssistant || isTeacher, ClassScheduleController.assignClassScheduleToClass)

export default router;
