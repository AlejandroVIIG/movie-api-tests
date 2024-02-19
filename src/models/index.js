const Movie = require('./Movie');
const Director = require('./Director');
const Actor = require('./Actor');
const Genre = require('./Genre');

Actor.belongsToMany(Movie, {through: "movies_actors"});
Movie.belongsToMany(Actor, {through: "movies_actors"});

Director.belongsToMany(Movie, {through: "movies_directors"});
Movie.belongsToMany(Director, {through: "movies_directors"});

Genre.belongsToMany(Movie, {through: "movies_genres"});
Movie.belongsToMany(Genre, {through: "movies_genres"});