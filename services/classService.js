import Class from "../models/class.js";

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



export { createClass, getClasses, getClassById,updateClass};
