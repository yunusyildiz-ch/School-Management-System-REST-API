import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Assistant = sequelize.define("Assistant", {
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

export default Assistant;
