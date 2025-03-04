import PDFDocument from "pdfkit-table";
import * as utils from "../utils/utils.js";
import fs from "fs";

export const createAttendancePDF = async (attendanceData, outputPath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    doc.font("Courier");

    doc.image("./assets/hicoders_logo.png", 50, 45, { width: 70 });

    const addressLine1 = "Schaffhauserstrasse 470";
    const addressLine2 = "8052 Zürich";
    doc
      .fontSize(10)
      .fillColor("#999")
      .text(
        addressLine1,
        doc.page.width - doc.widthOfString(addressLine1) - 100,
        45,
        { align: "right" }
      )
      .text(
        addressLine2,
        doc.page.width - doc.widthOfString(addressLine2) - 50,
        60,
        { align: "right" }
      );

    const title = `${
      attendanceData[0].classCode + " | " + attendanceData[0].className
    } Attendance Report`;
    doc
      .fontSize(15)
      .fillColor("#000")
      .text(title, 0, 125, { align: "center", width: doc.page.width });

    const startY = 200;
    const startX = 50;
    const underlineStartY = startY + 17;
    const initialYOffset = 5;

    const headers = ["No", "Student Name", "Date", "Status"];
    const columnWidths = [50, 200, 100, 100];
    headers.forEach((header, i) => {
      const headerX =
        startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);
      doc.fontSize(12).fillColor("#000").text(header, headerX, startY);

      const headerWidth = doc.widthOfString(header);
      doc
        .strokeColor("#000")
        .moveTo(headerX, underlineStartY)
        .lineTo(headerX + headerWidth, underlineStartY)
        .stroke();
    });

    doc.fontSize(10);
    attendanceData.forEach((data, index) => {
      const y = startY + initialYOffset + (index + 1) * 20;
      const formattedDate = utils.formatDate(data.date);
      const row = [index + 1, data.studentName, formattedDate, data.status];

      row.forEach((text, i) => {
        doc.text(
          text.toString(),
          startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0),
          y
        );
      });
    });

    doc.end();
    stream.on("finish", () => {
      resolve();
    });
    stream.on("error", (err) => {
      reject(err);
    });
  });
};

export const createAssignmentGradesPDF = async (gradesData, outputPath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

   
    doc.font("Courier");

    doc.image("./assets/hicoders_logo.png", 50, 45, { width: 70 });

    const addressLine1 = "Schaffhauserstrasse 470";
    const addressLine2 = "8052 Zürich";
    doc
      .fontSize(10)
      .fillColor("#999")
      .text(
        addressLine1,
        doc.page.width - doc.widthOfString(addressLine1) - 100,
        45,
        { align: "right" }
      )
      .text(
        addressLine2,
        doc.page.width - doc.widthOfString(addressLine2) - 50,
        60,
        { align: "right" }
      );

    const title = `${gradesData[0].title} Grades Report`;
    doc
      .fontSize(15)
      .fillColor("#000")
      .text(title, 0, 125, { align: "center", width: doc.page.width });

    const startY = 200;
    const startX = 50;
    const underlineStartY = startY + 17;
    const initialYOffset = 5;

    doc.fontSize(12).fillColor("#000");

    const headers = ["No", "Student Name", "Grade", "Date"];
    const columnWidths = [50, 200, 100, 100];
    headers.forEach((header, i) => {
      const headerWidth = doc.widthOfString(header);
      const headerX =
        startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);
      doc.text(header, headerX, startY);

      doc
        .strokeColor("#000")
        .moveTo(headerX, underlineStartY)
        .lineTo(headerX + headerWidth, underlineStartY)
        .stroke();
    });

    doc.fontSize(10);
    gradesData.forEach((grade, index) => {
      const y = startY + initialYOffset + (index + 1) * 20;
      const formattedDate = utils.formatDate(grade.updatedAt);
      const row = [index + 1, grade.studentName, grade.grade,formattedDate];

      row.forEach((text, i) => {
        doc.text(
          text.toString(),
          startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0),
          y
        );
      });
    });

    doc.end();
    stream.on("finish", () => {
      resolve();
    });
    stream.on("error", (err) => {
      reject(err);
    });
  });
};
