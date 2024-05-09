const UserService = require('../services/user.service');
const  jsonResponse  = require('../lib/jsonResponse');
const encrypt = require('../services/encrypt');

const router = require('express').Router();

router.post('/', async(req, res)=>{
    const {fullname, email, username, password} = req.body
    
    if(!!!fullname || !!!email || !!!username || !!!password){
        return res.status(400).json(jsonResponse(400,{
            error: 'Fields is required',
        }));
    }

    const password_hash = encrypt(password)
    const data ={
                    fullname : fullname,
                    email : email,
                    username : username,
                    password : await password_hash
                }
    console.log(data)

    const user = new UserService();
    const response = await user.create(data);
    if(response){
        res.status(200).json(jsonResponse(200, {
            message: 'User created successfully'
        }))
    }

});

module.exports = router;