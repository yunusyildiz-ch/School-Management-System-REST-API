import fs from "fs/promises";
import * as ReportService from "../services/reportService.js";
import path from "path";
import { fileURLToPath } from "url";
import { Class, Assignment } from "../models/index.js";

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
  downloadGradesReportForAssignment: async (req, res) => {
    const assignmentId = req.params.assignmentId;
    const assignment = await Assignment.findByPk(assignmentId);
    const outputPath = path.join(
      __dirname,
      `../outputs/${assignment.title}GradesReport.pdf`
    );

    await ReportService.generateGradesReportForAssignment(
      assignment,
      outputPath
    );
    res.download(outputPath);
  },
};

export default reportController;
