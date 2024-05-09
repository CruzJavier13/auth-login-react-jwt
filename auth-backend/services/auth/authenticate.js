const { jsonResponse } = require("../../lib/jsonResponse");
const getTokenHeader = require("./getTokenHeader");
const { verifyAccesToken } = require("./verifyToken");

function Authenticate(req, res, next){
    const token = getTokenHeader(req.header);

    if(token){

        const decode = verifyAccesToken(token);

        if(decode){
            req.user = {...decode.user};
            next();
        } else {

        }

    } else {
        res.status(4001).json(jsonResponse(401, {Message:'No token provide'}));
    }
}

module.exports = Authenticate