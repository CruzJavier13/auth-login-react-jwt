const jsonResponse = require('../lib/jsonResponse');
const comparePassword = require('../services/comparePassword');
const UserService = require('../services/user.service');
const encrypt = require('../services/encrypt');
const { createAccessToken, createRefreshToken } = require('../services/Token');
const getUserInfo = require('../services/getUserInfo');

const router = require('express').Router();

router.post('/', async (req, res)=>{
    const {username, password} = req.body

    if(!!!username || !!!password){
        return res.status(400).json(jsonResponse(400,{
            error: 'Fields is required',
        }));
    }

    const user = new UserService();
    
    const response = await user.findUser(username);

    
    if(response){
        const password_dec = await comparePassword(password, response.password)
        if(password_dec){
            const accessToken = createAccessToken();
            const refreshToken = await createRefreshToken();

            res.status(200).json(jsonResponse(200,{
            response: getUserInfo(response), accessToken, refreshToken
        }));
        } else {
            res.status(400).json(jsonResponse(400,{Message: 'Username or Password incorrect'}))
        }
        
    } else {
        res.status(404).json(jsonResponse(404, {
            Message: 'Username or Password incorrect'
        }))
    }
});

module.exports = router;