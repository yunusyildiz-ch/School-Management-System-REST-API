import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Student;
