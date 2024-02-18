import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const ClassSchedule = sequelize.define("ClassSchedule", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  classId: {
    type: DataTypes.INTEGER,
    references: { model: "Classes", key: "id" },
  },
  dayOfWeek: { type: DataTypes.STRING },
  startTime: { type: DataTypes.TIME },
  endTime: { type: DataTypes.TIME },
});

export default ClassSchedule;
