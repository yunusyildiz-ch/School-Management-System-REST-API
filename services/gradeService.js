import Grade from "../models/grade.js";
import Assignment from "../models/assignment.js";

const addGrade = async (studentId, assignmentId, grade) => {
  const [gradeRecord, created] = await Grade.findOrCreate({
    where: { studentId, assignmentId },
    defaults: { grade },
  });

  if (!created && grade !== gradeRecord.grade) {
    gradeRecord.grade = grade;
    gradeRecord.gradeStatus = "Graded";
    await gradeRecord.save();
  }

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
  return gradeRecord;
};

export { addGrade, removeGrade, getGrade, getAllGradesOfStudent,updateGrade };
