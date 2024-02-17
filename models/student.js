import sequelize from '../config/db.js';
import {DataTypes} from 'sequelize';

const Student = sequelize.define('Student',{

    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Users',
            key:'id'
        }
    }
 
});

export default Student;