import { File} from "../models/index.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "..", "uploads");

const uploadFile = async ({ name, type, size, path, isPublic, classIds }) => {
  const file = await File.create({
    name,
    type: type,
    size,
    path,
    isPublic,
  });

  if (classIds && classIds.length > 0 && !isPublic) {
    await file.addClasses(classIds);
  }

  return file;
};

const downloadFile = async (filename) => {
  const filePath = path.join(uploadsDir, filename);

  try {
    await fs.access(filePath, fs.constants.F_OK);
    return filePath;
  } catch (err) {
    throw { status: 404, message: "Sorry, file not found." };
  }
};

export  {
  uploadFile,
  downloadFile,
};
