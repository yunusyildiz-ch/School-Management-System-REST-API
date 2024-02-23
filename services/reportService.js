import {
  Student,
  Attendance,
  Assignment,
  ClassSchedule,
  User,
} from "../models/index.js";
import { createAttendancePDF } from "../views/pdf-templates.js";

export const generateAttendanceReportForClass = async (cls, outputPath) => {
  const attendances = await cls.getClassSchedules({
    include: [
      {
        model: Attendance,
        include: [
          {
            model: Student,
            include: [User],
          },
        ],
      },
    ],
  });

  const attendanceData = attendances
    .map((schedule) => {
      return schedule.Attendances.map((attendance) => {
        return {
          date: attendance.date,
          status: attendance.status ? "Present" : "Absent",
          studentName: attendance.Student.User.name,
          className: cls.name,
          classCode: cls.code,
        };
      });
    })
    .flat();

  createAttendancePDF(attendanceData, outputPath);
};
