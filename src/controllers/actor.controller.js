const catchError = require('../utils/catchError');
const Actor = require('../models/Actor');

const findAll = catchError(async(req, res) => {
    const actors = await Actor.findAll();
    return res.json(actors);
});

const create = catchError(async(req, res) => {
    const newActor = await Actor.create(req.body);
    return res.status(201).json(newActor);
});

const findOne = catchError(async(req, res) => {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    if(!actor) return res.sendStatus(404);
    return res.json(actor);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    if(!actor) return res.sendStatus(404);
    const removedActor = structuredClone(actor); // used to send info on destroyed instance
    await actor.destroy();
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    if(!actor) return res.sendStatus(404);
    const updatedActor = await actor.update(req.body);
    return res.json(updatedActor);
});

module.exports = {
    findAll,
    create,
    findOne,
    remove,
    update
}