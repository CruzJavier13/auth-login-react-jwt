const {Model, DataTypes} = require('sequelize');

const USER_TABLE = 'tbl_token';

class Token extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'Token',
            timestamps: true
        }
    }
}

const TokenSchema = {
    id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER
    },
    token:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'token'
    }
}

module.exports = {
    Token,
    TokenSchema
}
