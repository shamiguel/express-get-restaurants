
const request = require("supertest")
const {Restaurant} = require("./models/index");
const Menu = require("./models/index");
const Item = require("./models/index");
const db = require("./db/connection")
const app = require('./src/app');


describe("/GET restaurants", ()=>{
    it("returns restaurants", async()=>{
        const restaurants = await Restaurant.findAll();
        const response = await request(app).get('/restaurants');
        expect(response.statusCode).toBe(200)
        expect(JSON.stringify(response.body)).toEqual(JSON.stringify(restaurants))
        expect(response.body[0].name).toBe(restaurants[0].name);
    })

    it("returns a restaurant", async()=>{
        const restaurant = await Restaurant.findByPk(1);
        const response = await request(app).get('/restaurants/1');
        expect(response.statusCode).toBe(200)
        expect(JSON.stringify(response.body)).toEqual(JSON.stringify(restaurant))
        expect(response.body.name).toBe(restaurant.name);
    })
});


describe("/POST restaurants", ()=>{
    it("returns a successfully created restaurant", async()=>{
        const response = await request(app)
        .post('/restaurants')
        .send({
            "name": "AbbleJeans", 
            "location": "somewhere",
            "cuisine": "Haute"
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe("AbbleJeans");
    })
});

describe("/PUT restaurants", ()=>{
    it("returns a successfully updated restaurant", async()=>{
        const response = await request(app)
        .put('/restaurants/1')
        .send({
            "name": "AbbleJeans", 
        });
        const rest = await Restaurant.findByPk(1)
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe(rest.name);
    })
});

describe("/DELETE restaurants", ()=>{
    it("returns a deleted restaurant", async()=>{
        const restaurant = await Restaurant.findByPk(1);
        const response = await request(app).delete('/restaurants/1');
        expect(response.statusCode).toBe(200)
        expect(JSON.stringify(response.body)).toEqual(JSON.stringify(restaurant))
    })
});