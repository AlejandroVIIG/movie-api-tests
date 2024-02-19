const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE_URL, {
        logging: false,
        define: {
            timestamps: false,
            freezeTableName: true
        }
    });

module.exports = sequelize;