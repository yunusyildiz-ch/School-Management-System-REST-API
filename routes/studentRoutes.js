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

export default router;
