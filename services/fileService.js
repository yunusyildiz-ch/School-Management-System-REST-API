import fs from "fs/promises";
import path from "path";
import { File } from "../models/index.js";
import { fileURLToPath } from "url";
import { calculateFileHash } from "../utils/utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "..", "uploads");

const uploadFile = async ({ name, type, size, path, isPublic, classIds }) => {
  const fileHash = await calculateFileHash(path);
  let file = await File.findOne({ where: { hash: fileHash } });

  if (!file) {
    file = await File.create({
      name,
      type,
      size,
      path,
      isPublic,
      hash: fileHash,
    });
  }

  if (classIds && classIds.length > 0) {
    await file.setClasses(classIds);
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

export { uploadFile, downloadFile };
