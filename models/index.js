import User from './user.js';
import UserDetail from './userDetail.js';
import Teacher from './teacher.js';
import Student from './student.js';
import Staff from './staff.js';
import Class from './class.js';
import Assignment from './assignment.js';



User.hasOne(UserDetail, { foreignKey: 'userId' });
UserDetail.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Teacher, { foreignKey: 'userId' });
Teacher.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Student, { foreignKey: 'userId' });
Student.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Staff, { foreignKey: 'userId' });
Staff.belongsTo(User, { foreignKey: 'userId' });
Class.belongsToMany(Teacher, { through: 'ClassTeacher', foreignKey: 'classId' });
Teacher.belongsToMany(Class, { through: 'ClassTeacher', foreignKey: 'teacherId' });
Class.belongsToMany(Student, { through: 'ClassStudent', foreignKey: 'classId' });
Student.belongsToMany(Class, { through: 'ClassStudent', foreignKey: 'studentId' });
Assignment.belongsTo(Class, { foreignKey: 'classId' });
Class.hasMany(Assignment, { foreignKey: 'classId' });
Assignment.belongsTo(Class, { foreignKey: 'classId' });
Class.hasMany(Assignment, { foreignKey: 'classId' });
Assignment.belongsToMany(Student, { through: 'AssignmentStudent', foreignKey: 'assignmentId' });
Student.belongsToMany(Assignment, { through: 'AssignmentStudent', foreignKey: 'studentId' });

export {User,UserDetail,Student,Teacher,Staff,Class,Assignment}