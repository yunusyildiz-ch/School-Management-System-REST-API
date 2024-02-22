import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const ClassSchedule = sequelize.define("ClassSchedule", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
title:{
  type: DataTypes.STRING,
  allowNull: false,
},
  classId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: { model: "Classes", key: "id" },
  },

  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: { msg: "Start time is required." },
    },
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: { msg: "End time is required." },
      isAfterStart(value) {
        if (new Date(value) <= new Date(this.startTime)) {
          throw new Error("End time must be after the start time.");
        }
      },
    },
  },
  daysOfWeek: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
});

export default ClassSchedule;
