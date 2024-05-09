const { Token } = require('../db/models/Token.Model');
const { generateAccessToken, generateRefreshToken} = require('./auth/generateToken');
const getUserInfo = require('./getUserInfo');

const createAccessToken = () =>{
    return generateAccessToken(getUserInfo(this));
}
const createRefreshToken = async() =>{
    const refreshToken = generateRefreshToken(this);
    try{
        await new Token({token: refreshToken}).save();
        return refreshToken;
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    createAccessToken,
    createRefreshToken
}