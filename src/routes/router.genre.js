const { findAll, create, findOne, remove, update } = require('../controllers/genre.controller');
const express = require('express');

const routerGenre = express.Router();

routerGenre.route('/')
    .get(findAll)
    .post(create);

routerGenre.route('/:id')
    .get(findOne)
    .delete(remove)
    .put(update);

module.exports = routerGenre;