import express from "express";
import { upload } from "../config/multerConfig.js";
import  FileController from "../controllers/fileController.js";
import passport from "../config/passport.js";
import { isAdminOrAssistantOrTeacher } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistantOrTeacher,
  upload.single("file"),FileController.uploadFile
);

router.get("/download/:filename", FileController.downloadFile);

export default router;
