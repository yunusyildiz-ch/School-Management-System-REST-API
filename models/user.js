import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

/**
 * @swagger
 **/
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "teacher", "student", "mentor", "assistant"),
    allowNull: false,
  },
});

export default User;
