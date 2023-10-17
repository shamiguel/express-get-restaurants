const express = require("express");
const app = express();
const {Restaurant} = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 

app.use(express.json());

app.get(`/restaurants`, async(req, res)=>{
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
});

app.get('/restaurants/:id', async(req, res)=>{
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    res.json(restaurant);
})

app.post('/restaurants', async(req, res)=>{
    const data = req.body
    console.log(data)
    const restaurant = await Restaurant.create(data);
    res.json(restaurant);
})

app.put('/restaurants/:id', async(req, res)=>{
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    const updated = await restaurant.update(req.body)
    res.json(updated);
})

app.delete('/restaurants/:id', async(req, res)=>{
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    const destroy = await restaurant.destroy();
    res.json(destroy);
})



module.exports = app;