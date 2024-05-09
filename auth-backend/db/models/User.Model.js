const {Model, DataTypes} = require('sequelize');

const USER_TABLE = 'tbl_user';

class User extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: true
        }
    }
}

const UserSchema = {
    id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER
    },
    fullname:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'fullname'
    },
    email:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'email'
    },
    username:{
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        field: 'username'
    },
    password:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'password'
    }
}

module.exports = {
    User,
    UserSchema
}
