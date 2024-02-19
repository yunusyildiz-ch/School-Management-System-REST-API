import Grade from "../models/grade.js";
import User from "../models/user.js";
import Student from "../models/student.js";
import Assignment from "../models/assignment.js";
import { sendAssignmentGradeMail } from "../notifications/emailService.js";

const addGrade = async (studentId, assignmentId, grade) => {
  const student = await Student.findByPk(studentId)
  const assignment = await Assignment.findOne({
    where: { id: assignmentId },
  });
  const user = await User.findOne({ where: { id: student.userId } });
  const [gradeRecord, created] = await Grade.findOrCreate({
    where: { studentId, assignmentId },
    defaults: { grade },
  });

  if (!created && grade !== gradeRecord.grade) {
    gradeRecord.grade = grade;
    gradeRecord.gradeStatus = "Graded";
    await gradeRecord.save();
  }
  sendAssignmentGradeMail(
    user.email,
    user.name,
    assignment.title,
    assignment.dueDate,
    grade
  );
  return gradeRecord;
};

const removeGrade = async (studentId, assignmentId) => {
  const grade = await Grade.findOne({
    where: {
      studentId,
      assignmentId,
    },
  });

  if (!grade) {
    throw new Error("Grade not found");
  }

  await grade.destroy();
};

const getGrade = async (studentId, assignmentId) => {
  const grade = await Grade.findOne({
    where: {
      studentId,
      assignmentId,
    },
  });

  if (!grade) {
    throw new Error("Grade not found");
  }

  return grade;
};

const getAllGradesOfStudent = async (studentId) => {
  const grades = await Grade.findAll({
    where: { studentId },
    include: [
      {
        model: Assignment,
        required: true,
      },
    ],
  });

  if (!grades) {
    throw new Error("Grades for the specified student not found");
  }

  return grades;
};

const updateGrade = async (studentId, assignmentId, grade) => {
  const student = await Student.findByPk(studentId)
  const assignment = await Assignment.findOne({
    where: { id: assignmentId },
  });
  const user = await User.findOne({ where: { id: student.userId } });
  const gradeRecord = await Grade.findOne({
    where: {
      studentId,
      assignmentId,
    },
  });
  if (!gradeRecord) {
    throw new Error("Grade not found");
  }
  gradeRecord.grade = grade;
  gradeRecord.gradeStatus = "Graded";
  await gradeRecord.save();
  sendAssignmentGradeMail(
    user.email,
    user.name,
    assignment.title,
    assignment.dueDate,
    grade
  );
  return gradeRecord;
};

export { addGrade, removeGrade, getGrade, getAllGradesOfStudent, updateGrade };
