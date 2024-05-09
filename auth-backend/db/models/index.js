const { Token, TokenSchema } = require('./Token.Model');
const {User, UserSchema} = require('./User.Model');

function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize));
    Token.init(TokenSchema, Token.config(sequelize));
}

module.exports = {
    setupModels
}