import express from "express";
import passport from "../config/passport.js";
import * as teacherController from "../controllers/teacherController.js";
import { isAdminOrAssistant } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  teacherController.getAllTeachers
);

export default router;
