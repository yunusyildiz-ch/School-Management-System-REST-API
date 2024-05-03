import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Attendance = sequelize.define("Attendance", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  studentId: {
    type: DataTypes.INTEGER,
    references: { model: "Students", key: "id" },
  },
  classScheduleId: {
    type: DataTypes.INTEGER,
    references: { model: "ClassSchedules", key: "id" },
  },
  date: { type: DataTypes.DATE },
  status: { type: DataTypes.BOOLEAN },
});

export default Attendance;
