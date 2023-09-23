const request =require('supertest');
const app=require('../app');
let id;

test("GET /actors debe retornar status 200", async ()=>{
    const res= await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors debe crear un actor", async()=>{
    const actors={
        firstName:"Rojo",
        lastName: "Jhone",
        nationality:"Mexico",
        image:"wwww.",
        birthday:2000,
    }
    const res= await request(app).post('/actors').send(actors)
    id=res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('Put /actors/:id debe actualizar un actor', async ()=>{
    const actorUpdate={
        firstName:"RojoUpdate"
    }
    const res=await request(app).put(`/actors/${id}`).send(actorUpdate);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actorUpdate.name)
});

test('Delete /actors/:id debe eliminar un actor', async ()=>{
    const res=await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});