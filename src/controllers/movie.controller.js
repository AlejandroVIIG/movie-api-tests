const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Director = require('../models/Director');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');

const findAll = catchError(async(req, res) => {
    const movies = await Movie.findAll({include: [Director, Actor, Genre]});
    return res.json(movies);
});

const create = catchError(async(req, res) => {
    const newMovie = await Movie.create(req.body);
    return res.status(201).json(newMovie);
});

const findOne = catchError(async(req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id, {include: [Director, Actor, Genre]});
    if(!movie) return res.sendStatus(404);
    return res.json(movie);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) return res.sendStatus(404);
    const removedMovie = structuredClone(movie);
    await movie.destroy();
    return res.sendStatus(204).send(`Movie ${removedMovie.id} : ${removedMovie.name}`, removedMovie);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) return res.sendStatus(404);
    const updatedMovie = await movie.update(req.body);
    return res.json(updatedMovie);
});

const setDirectors = catchError(async(req, res) => {
    const {id} = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) return res.sendStatus(404);
    await movie.setDirectors(req.body);
    const movieDirectors = await movie.getDirectors();
    return res.json(movieDirectors);
});

const setActors = catchError(async(req, res) => {
    const {id} = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) return res.sendStatus(404);
    await movie.setActors(req.body);
    const movieActors = await movie.getActors();
    return res.json(movieActors);
});

const  setGenres = catchError(async(req, res) => {
    const {id} = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) return res.sendStatus(404);
    await movie.setGenres(req.body);
    const movieGenres = await movie.getGenres();
    return res.json(movieGenres);
})

module.exports = {
    findAll,
    create,
    findOne,
    remove,
    update,
    setDirectors,
    setActors,
    setGenres
}