const {Pool} = require('pg');

function dbconnect(){
    const pool = new Pool({
        user:'postgres',
        host:'localhost',
        database:'node-auth',
        password:'cruz@2024',
        port:'5432'
    });

    return pool
}

module.exports = {
    dbconnect
}