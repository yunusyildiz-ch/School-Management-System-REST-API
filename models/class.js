import sequelize from '../config/db.js';
import {DataTypes} from 'sequelize';


const Class = sequelize.define('Class',{
    code:{
        type:DataTypes.STRING,
        allowNull: true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[3,36]}
    },
  
    counselor:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

export default Class;