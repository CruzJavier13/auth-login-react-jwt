const jwt = require('jsonwebtoken');
const generateAccessToken = require('./generateToken');

function verifyAccesToken(token){
    try{
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch(error){
        console.error(error);
    }
}

function verifyRefreshToken(token){
    try{
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    verifyRefreshToken,
    verifyAccesToken
};

