const bcrypt = require('bcrypt');

const encrypt = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}
module.exports = encrypt



