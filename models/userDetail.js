import sequelize from '../config/db.js';
import {DataTypes} from 'sequelize';

const UserDetail = sequelize.define('UserDetail',{
    birthday:{
        type: DataTypes.DATE,
        allowNull:true,
       },
       adress:{
        type:DataTypes.STRING,
        allowNull:false
       }
});

export default UserDetail;