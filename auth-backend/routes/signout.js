const router = require('express').Router();
const jsonResponse = require('../lib/jsonResponse');

router.get('/', (req, res)=>{
    const {username, password} = req.body

    if(!!username || !!password){
        return res.status(400).json(jsonResponse(400, {
            error:'Field is required'
        }));
    }

    res.status(200).json(jsonResponse(200, {
        message: 'User created successfully'
    }))
    res.send('SignOut');
});

module.exports = router;