const request =require('supertest');
const app=require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');
let id;

test("GET /movies debe retornar status 200", async ()=>{
    const res= await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debe crear una pelicula", async()=>{
    const movie={
        name:"La bruja",
        releaseYear:"2000",
        synopsis:"En un bosque se esconde un secreto",
        image:"wwww",
    }
    const res= await request(app).post('/movies').send(movie)
    id=res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('Put /movies/:id debe actualizar una pelicula', async ()=>{
    const movieUpdate={
name:"La bruja Update"
    }
    const res=await request(app).put(`/movies/${id}`).send(movieUpdate);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movieUpdate.name)
});

// Testiar los actores en las peliculas
test('POST /movies/:id/actors debe insertar los actores de una pelicula', async ()=>{
    const actor= await Actors.create({
        firstName:"Actor",
        lastName: "Jhone",
        nationality:"Colombia",
        image:"wwww.",
        birthday:"2000",
    })
   const res= await request(app)
   .post(`/movies/${id}/actors`)
   .send([actor.id]);
   await actor.destroy();
   expect(res.status).toBe(200);
   expect(res.body.length).toBe(1);
});

// testiar los diresctores en las peliculas
test('POST /movies/:id/directors debe insertar los directores de una pelicula', async ()=>{
    const director= await Directors.create({
        firstName:"director",
        lastName: "Jhone",
        nationality:"Colombia",
        image:"wwww.",
        birthday:"2000",
    })
   const res= await request(app)
   .post(`/movies/${id}/directors`)
   .send([director.id]);
   await director.destroy();
   expect(res.status).toBe(200);
   expect(res.body.length).toBe(1);
});

//testiar los generos en las peliculas
test('POST /movies/:id/genres debe insertar los generos de una pelicula', async ()=>{
    const genres= await Genres.create({
        name:"Accion",   
    })
   const res= await request(app)
   .post(`/movies/${id}/genres`)
   .send([genres.id]);
   await genres.destroy();
   expect(res.status).toBe(200);
   expect(res.body.length).toBe(1);
});

test('Delete /movies/:id debe eliminar una pelicula', async ()=>{
    const res=await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});