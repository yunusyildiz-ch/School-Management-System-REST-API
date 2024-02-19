import express from 'express';
import * as GradeController from '../controllers/gradeController.js';
import passport from "../config/passport.js";
import {
    isAdminOrAssistant,
    isTeacher,
  } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/:studentId/:assignmentId', GradeController.addGrade);


export default router;
