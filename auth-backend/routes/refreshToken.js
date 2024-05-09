const { json } = require('express');

const jsonResponse = require('../lib/jsonResponse');
const getTokenHeader = require('../services/auth/getTokenHeader');

const {Token} = require('../db/models/Token.Model');
const TokenService = require('../services/token.service');

const { verifyRefreshToken } = require('../services/auth/verifyToken');
const {generateAccessToken} = require('../services/auth/generateToken');

const router = require('express').Router();


router.post('/', async(req,res)=>{
    const refreshToken = req.body.refreshToken;

    if(refreshToken){
        try{
            const found = await Token.findOne({ token: refreshToken });
            if(!found){
                return res.status(401).json(jsonResponse(401, 'Unauthorized'));
            }
            const payload = verifyRefreshToken(found.token);
            if(payload){
                const accessToken = generateAccessToken(payload.user);
                res.status(200).json(jsonResponse(200,{accessToken}));
            } else {
                res.status(401).json(jsonResponse(401, {error: 'Unauthorized'}));
            }
        }catch(err){
            console.error(err)        
        }
    } else {
        res.status(401).json(jsonResponse(401, {error:'Unauthorized'}));
    }
});



module.exports = router