import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadsDir = path.join(__dirname, "..", "uploads");

export const downloadFile = async (filename, res) => {
  const filePath = path.join(uploadsDir, filename);

  try {
    await fs.access(filePath, fs.constants.F_OK);
    return filePath;
  } catch (err) {
    throw { status: 404, message: "Sorry, file not found." };
  }
};
