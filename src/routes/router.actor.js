const { findAll, create, findOne, remove, update } = require('../controllers/actor.controller');
const express = require('express');

const routerActor = express.Router();

routerActor.route('/')
    .get(findAll)
    .post(create);

routerActor.route('/:id')
    .get(findOne)
    .delete(remove)
    .put(update);

module.exports = routerActor;