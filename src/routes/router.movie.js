const { findAll, create, findOne, remove, update, setDirectors, setActors, setGenres } = require('../controllers/movie.controller');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(findAll)
    .post(create);

routerMovie.route('/:id/directors')
           .post(setDirectors);

routerMovie.route('/:id/actors')
           .post(setActors);

routerMovie.route('/:id/genres')
           .post(setGenres);

routerMovie.route('/:id')
    .get(findOne)
    .delete(remove)
    .put(update);

module.exports = routerMovie;