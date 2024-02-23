import express from "express";
import reportController from "../controllers/reportController.js";

const router = express.Router();

router.get(
  "/attendance-report/:classId",
  reportController.downloadAttendanceReport
);

export default router;
