const {Sequelize} = require('sequelize');
require('dotenv').config();

const {config} = require('../db/config/config');

const {setupModels} = require('../db/models/index')

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: 'postgresql',
        logging: false
    }
);

sequelize.sync();
setupModels(sequelize);

module.exports = sequelize
