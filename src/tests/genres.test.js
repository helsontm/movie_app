const request =require('supertest');
const app=require('../app');
let id;

test("GET /genres' debe retornar status 200", async ()=>{
    const res= await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /genres' debe crear una un genero", async()=>{
    const genres={
        name:"anime",
    }
    const res= await request(app).post('/genres').send(genres)
    id=res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('Put /genres/:id debe actualizar un genero', async ()=>{
    const genreUpdate={
name:"anime Update"
    }
    const res=await request(app).put(`/genres/${id}`).send(genreUpdate);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genreUpdate.name)
});

test('Delete /genres/:id debe eliminar un genero', async ()=>{
    const res=await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});