import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Staff = sequelize.define("Staff", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expertise: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Staff;
