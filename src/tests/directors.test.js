const request =require('supertest');
const app=require('../app');
let id;

test("GET /directors debe retornar status 200", async ()=>{
    const res= await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors debe crear un director", async()=>{
    const director={
        firstName:"Director",
        lastName: "Jhone",
        nationality:"Colombia",
        image:"wwww.",
        birthday:2000,
    }
    const res= await request(app).post('/directors').send(director)
    id=res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('Put /directors/:id debe actualizar un director', async ()=>{
    const directorUpdate={
        firstName:"RojoUpdate"
    }
    const res=await request(app).put(`/directors/${id}`).send(directorUpdate);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(directorUpdate.name)
});

test('Delete /directors/:id debe eliminar un director', async ()=>{
    const res=await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});

