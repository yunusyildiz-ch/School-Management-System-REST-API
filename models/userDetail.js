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
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

export default UserDetail;
