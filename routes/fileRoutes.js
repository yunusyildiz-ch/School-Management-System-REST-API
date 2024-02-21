import express from "express";
import { upload } from "../config/multerConfig.js";
//todo: import { uploadFile} from "../controllers/fileController";
import passport from "../config/passport.js";
import { isAdminOrAssistantOrTeacher } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  isAdminOrAssistantOrTeacher,
  upload.single("file")
);

//todo: router.get("/download/:filename", downloadFile);

export default router;
