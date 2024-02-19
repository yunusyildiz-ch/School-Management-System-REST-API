import Grade from "../models/grade.js";

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

export { addGrade, removeGrade };
