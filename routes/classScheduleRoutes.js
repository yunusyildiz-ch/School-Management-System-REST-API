import express from "express";
import passport from "../config/passport.js";
import {
  isAdminOrAssistant,
  isAdminOrAssistantOrTeacher,
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

router.post(
  "/:classScheduleId/class/:classId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  ClassScheduleController.assignClassScheduleToClassAndCreateAttendance
);

router.put(
  "/:classScheduleId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant,
  ClassScheduleController.updateClassSchedule
);

export default router;
