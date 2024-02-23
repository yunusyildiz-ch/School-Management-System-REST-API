import fs from "fs/promises";
import * as ReportService from "../services/reportService.js";
import path from "path";
import { fileURLToPath } from "url";
import { Class } from "../models/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const reportController = {
  downloadAttendanceReport: async (req, res) => {
    const classId = req.params.classId;
    const cls = await Class.findByPk(classId);
    const outputPath = path.join(
      __dirname,
      `../outputs/${cls.code + "-" + cls.name}AttendanceReport.pdf`
    );

    await ReportService.generateAttendanceReportForClass(cls, outputPath);
    res.download(outputPath);
  },
};

export default reportController;
