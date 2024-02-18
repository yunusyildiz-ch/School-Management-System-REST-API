import express  from "express";
import passport from "../config/passport.js";
import * as AssignmentController from "../controllers/assignmentController.js";
import { isAdminOrAssistant,isTeacher } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),isAdminOrAssistant,
  AssignmentController.getAllAssignments);

  router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher,
  AssignmentController.createAssignment);

  router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant || isTeacher ,
  AssignmentController.getAssignmentById);

  router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant,
  AssignmentController.updateAssignment);

  router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistant,
  AssignmentController.deleteAssignment);



  export default router;