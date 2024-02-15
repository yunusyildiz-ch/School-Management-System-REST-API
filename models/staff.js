import sequelize from '../config/db.js';
import {DataTypes} from 'sequelize';


const Staff = sequelize.define('Staff',{
    expertise:{
        type: DataTypes.STRING,
         allowNull: true,
            }

});

export default Staff;