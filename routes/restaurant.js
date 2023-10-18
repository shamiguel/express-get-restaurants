const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant")
const {check, validationResult} = require("express-validator");


router.get(`/`, async(req, res)=>{
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
});

router.get('/:id', async(req, res)=>{
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    res.json(restaurant);
})

router.post('/',[
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim()
], async(req, res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const data = req.body
        //console.log(data)
        const restaurant = await Restaurant.create(data);
        res.json(restaurant);
    }
    
})

router.put('/:id', async(req, res)=>{
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    const updated = await restaurant.update(req.body)
    res.json(updated);
})

router.delete('/:id', async(req, res)=>{
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    const destroy = await restaurant.destroy();
    res.json(destroy);
})

module.exports = router;