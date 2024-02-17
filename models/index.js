import User from './user.js';
import UserDetail from './userDetail.js';
import Teacher from './teacher.js';
import Student from './student.js';
import Staff from './staff.js';
import Class from './class.js';
import Assignment from './assignment.js';
import Assistant from './assistant.js';



User.hasOne(UserDetail, { foreignKey: 'userId' });
UserDetail.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Teacher, { foreignKey: 'userId' });
Teacher.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Student, { foreignKey: 'userId' });
Student.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Staff, { foreignKey: 'userId' });
Staff.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Assistant,{ foreignKey: 'userId' });
Assistant.belongsTo(User, { foreignKey: 'userId' });
Class.belongsToMany(Teacher, { through: 'ClassTeacher', foreignKey: 'classId' });
Teacher.belongsToMany(Class, { through: 'ClassTeacher', foreignKey: 'teacherId' });
Class.belongsToMany(Student, { through: 'ClassStudent', foreignKey: 'classId' });
Student.belongsToMany(Class, { through: 'ClassStudent', foreignKey: 'studentId' });
Assignment.belongsToMany(Student, { through: 'AssignmentStudent', foreignKey: 'assignmentId' });
Student.belongsToMany(Assignment, { through: 'AssignmentStudent', foreignKey: 'studentId' });
Assignment.belongsToMany(Class, { through: 'AssignmentClass', foreignKey: 'assignmentId' });
Class.belongsToMany(Assignment, { through: 'AssignmentClass', foreignKey: 'classId' });


export {User,UserDetail,Student,Teacher,Staff,Class,Assignment,Assistant}