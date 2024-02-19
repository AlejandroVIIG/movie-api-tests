const express = require('express');
const routerMovie = require('./router.movie');
const routerDirector = require('./router.director');
routerActor = require('./router.actor');
routerGenre = require('./router.genre');
const router = express.Router();

// colocar las rutas aquí
router.use('/movies', routerMovie);
router.use('/directors', routerDirector);
router.use('/actors', routerActor);
router.use('/genres', routerGenre);


module.exports = router;