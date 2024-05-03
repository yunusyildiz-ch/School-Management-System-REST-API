import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Mentor = sequelize.define("Mentor", {
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

export default Mentor;
