import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Teacher = sequelize.define('Teacher',{
   
expertise:{
type: DataTypes.STRING,
 allowNull: true,
    }

});

export default Teacher;