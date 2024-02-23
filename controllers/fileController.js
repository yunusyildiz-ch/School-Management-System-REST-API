import * as FileService from "../services/fileService.js";

const FileController = {
  uploadFile: async (req, res) => {
    try {
      const { originalname, mimetype, size, path } = req.file;
      const { classIds, isPublic } = req.body;

      const { file, existingFile, message } = await FileService.uploadFile({
        name: originalname,
        type: mimetype,
        size,
        path,
        isPublic,
        classIds,
      });

      if (existingFile) {
        return res.status(200).json({
          success: true,
          message,
          fileId: existingFile.id,
        });
      } else {
        return res.status(200).json({
          success: true,
          message,
          file: {
            id: file.id,
            name: file.name,
          },
        });
      }
    } catch (error) {
      console.error("Error", error);
      res.status(500).send("An error occurred during the file upload process.");
    }
  },

  downloadFile: async (req, res) => {
    try {
      const { filename } = req.params;
      await FileService.downloadFile(filename, res);
    } catch (error) {
      console.error("Error", error.message);
      res.status(error.status || 500).send(error.message);
    }
  },
};

export default FileController;
