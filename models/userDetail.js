import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const UserDetail = sequelize.define("UserDetail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
   
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  adress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default UserDetail;
