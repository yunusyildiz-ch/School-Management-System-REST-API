import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Assignment = sequelize.define("Assignment", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  assignedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default Assignment;
