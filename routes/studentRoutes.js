import express from "express";
import passport from "../config/passport.js";
import * as studentController from "../controllers/studentController.js";
import { isAdminOrAssistant } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  studentController.getAllStudents
);

export default router;
