const { findAll, create, findOne, remove, update } = require('../controllers/director.controller');
const express = require('express');

const routerDirector = express.Router();

routerDirector.route('/')
    .get(findAll)
    .post(create);

routerDirector.route('/:id')
    .get(findOne)
    .delete(remove)
    .put(update);

module.exports = routerDirector;