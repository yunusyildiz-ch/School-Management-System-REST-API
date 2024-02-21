import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, callBack) {
    const uniqueSuffix = uuidv4();
    callBack(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, res, callBack) => {
  callBack(null, true);
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
