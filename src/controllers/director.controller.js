const catchError = require('../utils/catchError');
const Director = require('../models/Director');

const findAll = catchError(async(req, res) => {
    const directors = await Director.findAll();
    return res.json(directors);
});

const create = catchError(async(req, res) => {
    const newDirector = await Director.create(req.body);
    return res.status(201).json(newDirector);
});

const findOne = catchError(async(req, res) => {
    const { id } = req.params;
    const director = await Director.findByPk(id);
    if(!director) return res.sendStatus(404);
    return res.json(director);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const director = await Director.findByPk(id);
    if(!director) return res.sendStatus(404);
    const removedDirector = structuredClone(director); // used to send info on destroyed instance
    await director.destroy();
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const director = await Director.findByPk(id);
    if(!director) return res.sendStatus(404);
    const updatedDirector = await director.update(req.body);
    return res.json(updatedDirector);
});

module.exports = {
    findAll,
    create,
    findOne,
    remove,
    update
}