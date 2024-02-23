import PDFDocument from "pdfkit";
import * as utils from "../utils/utils.js";
import fs from "fs";

export const createAttendancePDF = (attendanceData, outputPath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputPath));
  console.log(attendanceData);
  doc
    .fontSize(20)
    .text(
      `${
        attendanceData[0].classCode + " | " + attendanceData[0].className
      } Attendance Report`,
      { align: "center" }
    );
  doc.moveDown(2);

  doc
    .fontSize(14)
    .text("No    Student Name                Date        Status", {
      underline: true,
    });
  doc.moveDown(0.5);

  attendanceData.forEach((attendance, index) => {
    const formattedDate = utils.formatDate(attendance.date);
    const line = `${index + 1}     ${attendance.studentName.padEnd(
      30
    )} ${formattedDate.padEnd(12)} ${attendance.status}`;
    doc.fontSize(12).text(line);
    doc.moveDown(0.25);
  });

  doc.end();
};

export const createAssignmentGradesPDF = (gradesData, outputPath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputPath));

  console.log(gradesData);
  doc
    .fontSize(20)
    .text(`${gradesData[0].title} Grades Report`, { align: "center" });
  doc.moveDown(2);

  doc.fontSize(14).text("No    Student Name              Grade       Date", {
    underline: true,
  });
  doc.moveDown(0.5);

  gradesData.forEach((grade, index) => {
    const formattedDate = utils.formatDate(grade.updatedAt);
    const line = `${index + 1}     ${grade.studentName.padEnd(40)} ${
      grade.grade
    }    ${formattedDate}`;
    doc.fontSize(12).text(line);
    doc.moveDown(0.25);
  });

  doc.end();
};
