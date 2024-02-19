const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Movie = sequelize.define('movie', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
    }
});

module.exports = Movie;