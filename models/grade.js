import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Grade = sequelize.define("Grade", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  studentId: {
    type: DataTypes.INTEGER,
    references: { model: "Students", key: "id" },
  },
  assignmentId: {
    type: DataTypes.INTEGER,
    references: { model: "Assignments", key: "id" },
  },
  grade: { type: DataTypes.FLOAT },
});

export default Grade;
