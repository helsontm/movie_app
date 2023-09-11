const catchError = require('../utils/catchError');
const Movies = require('../models/Movies');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');

const getAll = catchError(async(req, res) => {
    const results = await Movies.findAll({include:[Actors, Directors, Genres]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movies.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movies.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movies.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movies.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

// añadir actores a la pelicula
const setMovieActor =  catchError(async(req, res) => {
  const {id}=req.params;
  const movieA = await Movies.findByPk(id);
  await movieA.setActors(req.body);
  const actor= await movieA.getActors();
  return res.json(actor);
})

// añadir directores a la pelicula
const setMovieDirector =  catchError(async(req, res) => {
    const {id}=req.params;
    const movieD = await Movies.findByPk(id);
    await movieD.setDirectors(req.body);
    const director= await movieD.getDirectors();
    return res.json(director);
  })
  
  // Añadir Generos a la pelicula
  const setMovieGenre =  catchError(async(req, res) => {
    const {id}=req.params;
    const movieG = await Movies.findByPk(id);
    await movieG.setGenres(req.body);
    const genre= await movieG.getGenres();
    return res.json(genre);
  })



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMovieActor,
    setMovieDirector,
    setMovieGenre
}