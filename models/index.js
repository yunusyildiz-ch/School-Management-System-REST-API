import Sequelize from 'sequelize';
import User from './user.js';
import UserDetail from './userDetail.js';
import Teacher from './teacher.js';
import Student from './student.js';
import Mentor from './mentor.js';
import Class from './class.js';
import Assignment from './assignment.js';
import Assistant from './assistant.js';

User.hasOne(UserDetail, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserDetail.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Teacher, { foreignKey: 'userId', onDelete: 'CASCADE' });
Teacher.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Student, { foreignKey: 'userId', onDelete: 'CASCADE' });
Student.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Mentor, { foreignKey: 'userId', onDelete: 'CASCADE' });
Mentor.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Assistant, { foreignKey: 'userId', onDelete: 'CASCADE' });
Assistant.belongsTo(User, { foreignKey: 'userId' });

Class.belongsToMany(Teacher, {
  through: 'ClassTeacher',
  foreignKey: 'classId',
});

Teacher.belongsToMany(Class, {
  through: 'ClassTeacher',
  foreignKey: 'teacherId',
});

Class.belongsToMany(Student, {
  through: 'ClassStudent',
  foreignKey: 'classId',
});

Student.belongsToMany(Class, {
  through: 'ClassStudent',
  foreignKey: 'studentId',
});

Assignment.belongsToMany(Student, {
  through: 'AssignmentStudent',
  foreignKey: 'assignmentId',
});

Student.belongsToMany(Assignment, {
  through: 'AssignmentStudent',
  foreignKey: 'studentId',
});

Assignment.belongsToMany(Class, {
  through: 'AssignmentClass',
  foreignKey: 'assignmentId',
});

Class.belongsToMany(Assignment, {
  through: 'AssignmentClass',
  foreignKey: 'classId',
});

export {
  User,
  UserDetail,
  Student,
  Teacher,
  Mentor,
  Class,
  Assignment,
  Assistant,
};

