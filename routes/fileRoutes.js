import express from "express";
import { upload } from "../config/multerConfig.js";
import { uploadFile} from "../controllers/fileController.js";
import passport from "../config/passport.js";
import { isAdminOrAssistantOrTeacher } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistantOrTeacher,
  upload.single("file"),
  uploadFile
);



// router.get("/download/:filename", downloadFile);

export default router;
