import Class from "../models/class.js";
import User from "../models/user.js";
import Teacher from "../models/teacher.js";
import Student from "../models/student.js";
import Assignment from "../models/assignment.js";
import Grade from "../models/grade.js";
import { sendNewAssignmentMail } from "../notifications/mailService.js";

const createClass = async (classData) => {
  const newClass = await Class.create({
    name: classData.name,
    code: classData.code,
    counselor: classData.counselor,
  });

  return newClass;
};

const getClasses = async () => {
  const classes = await Class.findAll();
  return classes;
};

const getClassById = async (id) => {
  const existingClass = await Class.findByPk(id);
  return existingClass;
};

const updateClass = async (id, classData) => {
  const existingClass = await Class.findByPk(id);
  if (!existingClass) {
    throw new Error("Class not found");
  }
  (existingClass.name = classData.name),
    (existingClass.code = classData.code),
    (existingClass.counselor = classData.counselor);
  await existingClass.save();
  return existingClass;
};

const deleteClass = async (id) => {
  const existingClass = await Class.findByPk(id);
  if (!existingClass) {
    throw new Error("Class not found");
  }
  await existingClass.destroy();
  return existingClass;
};

const addTeacherToClass = async (id, teacherId) => {
  try {
    const existingClass = await Class.findByPk(id);
    if (!existingClass) {
      throw new Error("Class not found");
    }

    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      throw new Error("Teacher not found");
    }

    await existingClass.addTeacher(teacher);

    const updatedClass = await Class.findByPk(id, { include: [Teacher] });
    return updatedClass;
  } catch (error) {
    throw error;
  }
};

const addStudentToClass = async (id, studentId) => {
  try {
    const existingClass = await Class.findByPk(id);
    if (!existingClass) {
      throw new Error("Class not found");
    }

    const student = await Student.findByPk(studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    await existingClass.addStudent(student);

    const updatedClass = await Class.findByPk(id, { include: [Student] });
    return updatedClass;
  } catch (error) {
    throw error;
  }
};

const getTeachersOfClass = async (id) => {
  try {
    const existingClass = await Class.findByPk(id);
    if (!existingClass) {
      throw new Error("Class not found");
    }

    const teachers = await existingClass.getTeachers();
    return teachers;
  } catch (error) {
    throw error;
  }
};

const getStudentsOfClass = async (id) => {
  try {
    const existingClass = await Class.findByPk(id);
    if (!existingClass) {
      throw new Error("Class not found");
    }

    const students = await existingClass.getStudents();
    return students;
  } catch (error) {
    throw error;
  }
};

const removeTeacherFromClass = async (id, teacherId) => {
  try {
    const existingClass = await Class.findByPk(id);
    if (!existingClass) {
      throw new Error("Class not found");
    }

    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      throw new Error("Teacher not found");
    }

    await existingClass.removeTeacher(teacher);

    const updatedClass = await Class.findByPk(id, { include: [Teacher] });
    return updatedClass;
  } catch (error) {
    throw error;
  }
};

const removeStudentFromClass = async (id, studentId) => {
  try {
    const existingClass = await Class.findByPk(id);
    if (!existingClass) {
      throw new Error("Class not found");
    }

    const student = await Student.findByPk(studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    await existingClass.removeStudent(student);

    const updatedClass = await Class.findByPk(id, { include: [Student] });
    return updatedClass;
  } catch (error) {
    throw error;
  }
};

const setAssignmentToClass = async (classId, assignmentId) => {
  try {
    const existingClass = await Class.findByPk(classId);
    if (!existingClass) {
      throw new Error("Class not found");
    }

    const assignment = await Assignment.findByPk(assignmentId);
    if (!assignment) {
      throw new Error("Assignment not found");
    }

    const existingAssignment = await existingClass.getAssignments({
      where: { id: assignmentId },
    });

    if (existingAssignment.length > 0) {
      console.log("Assignment already assigned to class.");
      return existingClass;
    } else {
      await existingClass.addAssignment(assignment);
    }

    const students = await existingClass.getStudents();

    await Promise.all(
      students.map(async (student) => {
        const existingGrade = await Grade.findOne({
          where: {
            studentId: student.id,
            assignmentId: assignment.id,
          },
        });

        if (!existingGrade) {
          await Grade.create({
            studentId: student.id,
            assignmentId: assignment.id,
          });

          const user = await User.findByPk(student.userId);
          if (user) {
            const email = user.email;
            const name = user.name;
            const date = assignment.dueDate;
            sendNewAssignmentMail(email, name,assignment.title, date);
          }
        }
      })
    );

    return await Class.findByPk(classId, { include: [Assignment] });
  } catch (error) {
    throw error;
  }
};

const getAssignmentsOfClass = async (id) => {
  const cls = await Class.findByPk(id);
  const assignments = cls.getAssignments();
  return assignments;
};

export {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
  addTeacherToClass,
  addStudentToClass,
  getTeachersOfClass,
  getStudentsOfClass,
  removeTeacherFromClass,
  removeStudentFromClass,
  setAssignmentToClass,
  getAssignmentsOfClass,
};
