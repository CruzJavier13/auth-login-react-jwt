function getTokenHeader(headers){
    if(headers && headers.autorization){
        const parted = headers.authorization.split(' ');
        if(parted.length == 2){
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

module.exports = getTokenHeader;