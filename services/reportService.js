import {
  Student,
  Attendance,
  Assignment,
  ClassSchedule,
  Class,
  Grade,
  User,
} from "../models/index.js";
import {
  createAttendancePDF,
  createAssignmentGradesPDF,
} from "../views/pdf-templates.js";

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

  const report = await createAttendancePDF(attendanceData, outputPath);
  return report;
  
};

export const generateGradesReportForAssignment = async (
  assignment,
  outputPath
) => {
  const grades = await assignment.getGrades({
    include: [
      {
        model: Student,
        include: [
          {
            model: User,
          },
          {
            model: Class,
            through: { attributes: [] },
          },
        ],
      },
    ],
  });

  const gradesData = grades.map((grade) => {
    const studentClass = grade.Student.Classes[0];

    return {
      title: assignment.title,
      studentName: grade.Student.User.name,
      grade: grade.grade,
      className: studentClass ? studentClass.name : "N/A",
      classCode: studentClass ? studentClass.code : "N/A",
      updatedAt: grade.updatedAt,
    };
  });

  createAssignmentGradesPDF(gradesData, outputPath);
};
