import Class from "../models/class.js";
import Teacher from "../models/teacher.js";
import Student from "../models/student.js";
import Assignment from "../models/assignment.js";

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

const setAssignmentToClass = async (id, assignmentId) => {
  try {
    const existingClass = await Class.findByPk(id);
    if (!existingClass) {
      throw new Error("Class not found");
    }

    const assignment = await Assignment.findByPk(assignmentId);
    if (!assignment) {
      throw new Error("Assignment not found");
    }

    await existingClass.addAssignment(assignment);

    const updatedClass = await Class.findByPk(id, { include: [Assignment] });
    return updatedClass;
  } catch (error) {
    throw error;
  }
};

const getAssignmentsOfClass = async(id)=>{
  const cls = await Class.findByPk(id);
  const assignments = cls.getAssignments()
  return assignments;
}

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
  getAssignmentsOfClass
};
