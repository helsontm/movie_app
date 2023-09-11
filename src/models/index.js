const Genres = require("./Genres");
const Movies= require("./Movies");
const Actors= require("./Actors");
const Director = require("./Directors");

Movies.belongsToMany(Actors, { through: 'movieActor' });
Actors.belongsToMany(Movies,{through: 'movieActor'});

Movies.belongsToMany(Director, {through: 'movieDirector'});
Director.belongsToMany(Movies, {through: 'movieDirector'});

Movies.belongsToMany(Genres,{through: 'movieGenre'})
Genres.belongsToMany(Movies, {through: 'movieGenre'})


