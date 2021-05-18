'use strict';
const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);


describe('server', () => {
  it('should get 404 status', async () => {
    const response = await request.get('/jhu');
    expect(response.status).toBe(404);
  });

  it('should get a welcome message', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('welcome to server.js');
  });

  it('wrong method', async () => {
    const response = await request.delete('/api/v1/clothes');
    expect(response.status).toEqual(404);
  });
 
  it('should get an error', async () => {
    const response = await request.get('/bad');
    expect(response.status).toEqual(500);
  });

});


describe('food routes', () => {
  let id;
  it('should create a new Food using post request', async () => {
    //arrange
    let food = {
      name: 'banana',
      color: 'yellow',
    };
    //act
    const response = await request.post('/api/v1/food').send(food);
    //assert
    expect(response.status).toEqual(201);
    expect(response.body.data.name).toEqual('banana');
    expect(response.body.data.color).toEqual('yellow');
    expect(response.body.id.length).toBeGreaterThan(0);
    
    id = response.body.id;
  });
  it('get all food on GET /api/v1/food', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
  });
  it('get a food on Get /api/v1/food/:id', async () => {
    const res = await request.get(`/api/v1/food/${id}`);
    expect(res.status).toEqual(200);
    expect(res.body.data.name).toEqual('banana');
    
  });
  it('should update a food using put request', async () => {
    //arrange
    let editFood = {
      name: 'orange',
      color: 'orange',
    };
    //act
    const response = await request.put(`/api/v1/food/${id}`)
      .send(editFood);
    //assert
    expect(response.status).toEqual(200);
    expect(response.body.data.name).toEqual('orange');
    expect(response.body.data.color).toEqual('orange');
    expect(response.body.id).toEqual(`${id}`);
  });
  it('should be able to delete data on DELETE /api/v1/food/id', async () => {
    const response = await request.delete(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(undefined);
  });
});


describe('clothes routes', () => {
  let id;
  it('should create a new clothes using post request', async () => {
    //arrange
    let clothes = {
      type: 'skirt',
      price: '20$',
    };
      //act
    const response = await request.post('/api/v1/clothes').send(clothes);
    //assert
    expect(response.status).toEqual(201);
    expect(response.body.data.type).toEqual('skirt');
    expect(response.body.data.price).toEqual('20$');
    expect(response.body.id.length).toBeGreaterThan(0);
      
    id = response.body.id;
  });
  it('get all clothes on GET /api/v1/clothes', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
  });
  it('get a clothes on Get /api/v1/clothes/:id', async () => {
    const res = await request.get(`/api/v1/clothes/${id}`);
    expect(res.status).toEqual(200);
    expect(res.body.data.type).toEqual('skirt');
      
  });
  it('should update a clothes using put request', async () => {
    //arrange
    let editClothes = {
      type: 'scarf',
      price: '15$',
    };
      //act
    const response = await request.put(`/api/v1/clothes/${id}`)
      .send(editClothes);
      //assert
    expect(response.status).toEqual(200);
    expect(response.body.data.type).toEqual('scarf');
    expect(response.body.data.price).toEqual('15$');
    expect(response.body.id).toEqual(`${id}`);
  });
  it('should be able to delete data on DELETE /api/v1/food/id', async () => {
    const response = await request.delete(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(undefined);
    // expect(response.body.data).toEqual(undefined);
  });

});
