import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 36],
    },
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
    type: DataTypes.ENUM("admin", "teacher", "student","staff",'admin_assistant'),
    defaultValue: "student",
  }
  
});

export default User;
