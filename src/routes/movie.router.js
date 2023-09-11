const { getAll, create, getOne, remove, update, setMovieActor, setMovieDirector, setMovieGenre } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

    movieRouter.route("/:id/actors")
    .get(setMovieActor)

    movieRouter.route("/:id/directors")
    .get(setMovieDirector)

    movieRouter.route("/:id/genres")
    .get(setMovieGenre)

module.exports = movieRouter;