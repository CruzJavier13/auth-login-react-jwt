const bcrypt = require('bcrypt')

const comparePassword = async(password, hash) => {
    const same = await bcrypt.compare(password, hash);
    return same;
}

module.exports = comparePassword;