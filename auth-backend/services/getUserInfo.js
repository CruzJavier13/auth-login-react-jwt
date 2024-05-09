function getUserInfo(user){
    return {
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        id: user.id
    }
}

module.exports = getUserInfo;