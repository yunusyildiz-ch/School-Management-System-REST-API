import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Teacher = sequelize.define('Teacher',{
   
expertise:{
type: DataTypes.STRING,
 allowNull: true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Users',
            key:'id'
        }
    }

});

export default Teacher;