export const uploadFile = (req, res) => {
    try {

      res.status(200).json({ success: true, message: "File successfully uploaded", file: req.file });
    } catch (error) {
      console.error("Error", error);
      res.status(500).send("An error occurred during the file upload process.");
    }
  };


