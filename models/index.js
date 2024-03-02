import Sequelize from "sequelize";
import User from "./user.js";
import UserDetail from "./userDetail.js";
import Teacher from "./teacher.js";
import Student from "./student.js";
import Mentor from "./mentor.js";
import Class from "./class.js";
import Assignment from "./assignment.js";
import Assistant from "./assistant.js";
import Grade from "./grade.js";
import ClassSchedule from "./classSchedule.js";
import Attendance from "./attendance.js";
import File from "./file.js";

User.hasOne(UserDetail, { foreignKey: "userId", onDelete: "CASCADE" });
UserDetail.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Teacher, { foreignKey: "userId", onDelete: "CASCADE" });
Teacher.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Student, { foreignKey: "userId", onDelete: "CASCADE" });
Student.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Mentor, { foreignKey: "userId", onDelete: "CASCADE" });
Mentor.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Assistant, { foreignKey: "userId", onDelete: "CASCADE" });
Assistant.belongsTo(User, { foreignKey: "userId" });

Teacher.belongsToMany(ClassSchedule, {
  through: "TeacherSchedules",
  foreignKey: "TeacherId",
});
ClassSchedule.belongsToMany(Teacher, {
  through: "TeacherSchedules",
  foreignKey: "classScheduleId",
});

Class.belongsToMany(Teacher, {
  through: "ClassTeachers",
  foreignKey: "classId",
});
Teacher.belongsToMany(Class, {
  through: "ClassTeachers",
  foreignKey: "teacherId",
});

Class.belongsToMany(Student, {
  through: "ClassStudents",
  foreignKey: "classId",
});
Student.belongsToMany(Class, {
  through: "ClassStudents",
  foreignKey: "studentId",
});

Assignment.belongsToMany(Class, {
  through: "AssignmentClasses",
  foreignKey: "assignmentId",
  onDelete: 'CASCADE'
});
Class.belongsToMany(Assignment, {
  through: "AssignmentClasses",
  foreignKey: "classId",
  onDelete: 'CASCADE'
});

Grade.belongsTo(Student, { foreignKey: "studentId",onDelete: 'CASCADE' });
Grade.belongsTo(Assignment, { foreignKey: "assignmentId",onDelete: 'CASCADE' });
Student.hasMany(Grade, { foreignKey: "studentId",onDelete: 'CASCADE' });
Assignment.hasMany(Grade, { foreignKey: "assignmentId",onDelete: 'CASCADE' });

Class.hasMany(ClassSchedule, { foreignKey: "classId" });
ClassSchedule.belongsTo(Class, { foreignKey: "classId" });

File.belongsToMany(Class, { through: "ClassFiles" });
Class.belongsToMany(File, { through: "ClassFiles" });

Attendance.belongsTo(Student, { foreignKey: "studentId" });
Attendance.belongsTo(ClassSchedule, { foreignKey: "classScheduleId" });
Student.hasMany(Attendance, { foreignKey: "studentId" });
ClassSchedule.hasMany(Attendance, { foreignKey: "classScheduleId" });

export {
  User,
  UserDetail,
  Student,
  Teacher,
  Mentor,
  Class,
  File,
  Assignment,
  Assistant,
  Grade,
  ClassSchedule,
  Attendance,
};
