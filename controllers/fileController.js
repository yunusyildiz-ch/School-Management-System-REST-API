import * as FileService from "../services/fileService.js";

const uploadFile = (req, res) => {
  try {
    res
      .status(200)
      .json({
        success: true,
        message: "File successfully uploaded",
        file: req.file,
      });
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("An error occurred during the file upload process.");
  }
};

const downloadFile = (req, res) => {
  const { filename } = req.params;
  FileService.downloadFile(filename, res)
    .then((filePath) => res.download(filePath))
    .catch((error) => {
      console.error("Error", error.message);
      res.status(error.status || 500).send(error.message);
    });
};

export { uploadFile, downloadFile };
