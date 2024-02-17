import Class from "../models/class.js";
import Teacher from "../models/teacher.js";
import Student from "../models/student.js";

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
  const cls = await Class.findByPk(id);
  return cls;
};

const updateClass = async (id, classData) => {
  const existingCls = await Class.findByPk(id);
  if (!existingCls) {
    throw new Error("Class not found");
  }
  (existingCls.name = classData.name),
    (existingCls.code = classData.code),
    (existingCls.counselor = classData.counselor);
  await existingCls.save();
  return existingCls;
};

const deleteClass = async (id) => {
  const existingCls = await Class.findByPk(id);
  if (!existingCls) {
    throw new Error("Class not found");
  }
  await existingCls.destroy();
  return existingCls;
}


const addTeacherToClass = async (id, teacherId) => {
  try {
    const cls = await Class.findByPk(id);
    if (!cls) {
      throw new Error('Class not found');
    }

    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      throw new Error('Teacher not found');
    }

  
    await cls.addTeacher(teacher);

  
    const updatedClass = await Class.findByPk(id, { include: [Teacher] });
    return updatedClass;
  } catch (error) {
    throw error;
  }
};


export { createClass, getClasses, getClassById,updateClass,deleteClass,addTeacherToClass};
