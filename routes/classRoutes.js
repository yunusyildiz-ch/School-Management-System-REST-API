import express from "express";
import * as classController from "../controllers/classController.js";
import { isAdminOrAssistant } from "../middlewares/authMiddleware.js";
import passport from "../config/passport.js";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant,
  classController.createClass
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  classController.getClasses
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  classController.getClassById
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant,
  classController.updateClass
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant,
  classController.deleteClass)

  router.post("/:id/teacher/:teacherId",passport.authenticate("jwt", { session:false}), isAdminOrAssistant,classController.addTeacherToClass);

  router.post("/:id/student/:studentId",passport.authenticate("jwt", {session:false}), isAdminOrAssistant,classController.addStudentToClass);

  router.get("/:id/teacher",passport.authenticate("jwt",{session:false}),isAdminOrAssistant,classController.getTeachersOfClass)

export default router;
