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
  upload.single("file"),
  (req, res) => { 
    try {
     
      res.status(200).json({success: true, message: "File successfully uploaded", file: req.file});
    } catch (error) {
      console.error("Error", error);

      res.status(500).send("An error occurred during the file upload process.");
    }
  }
);



//todo: router.get("/download/:filename", downloadFile);

export default router;
