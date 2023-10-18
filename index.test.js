
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
        const restData = {name: "Shami's", location: "NYC", cuisine: "fusion"};
        let id;
        try{
            const newRest = await Restaurant.create()
            id = newRest.id
        }catch(err){
            console.log(err)
        }
        const restaurant = await Restaurant.findByPk(id)
        const response = await request(app).get(`/restaurants/${id}`);
        expect(response.statusCode).toBe(200)
        expect(JSON.stringify(response.body)).toBe(JSON.stringify(restaurant))
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

    it('sends an array of errors if validation fails', async()=>{
        const response = await request(app)
        .post('/restaurants')
        .send({
            name: "",
            cuisine: "",
            location:"        "
        })
        const data = JSON.parse(response.text)
        console.log(response.body.error)
        console.log(data.error)
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body.error)).toBe(true);
        expect(data.error).toEqual(response.body.error);
    })
});

describe("/PUT restaurants", ()=>{
    it("returns a successfully updated restaurant", async()=>{
        const restData = {name: "Shami's", location: "NYC", cuisine: "fusion"};
        let id;
        try{
            const newRest = await Restaurant.create()
            id = newRest.id
        }catch(err){
            console.log(err)
        }
        const response = await request(app)
        .put(`/restaurants/${id}`)
        .send({
            "name": "AbbleJeans", 
        });
        const rest = await Restaurant.findByPk(id)
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe(rest.name);
    })
});

describe("/DELETE restaurants", ()=>{
    it("returns a deleted restaurant", async()=>{
        const restData = {name: "Shami's", location: "NYC", cuisine: "fusion"};
        let id;
        try{
            const newRest = await Restaurant.create()
            id = newRest.id
        }catch(err){
            console.log(err)
        }
        const restaurant = await Restaurant.findByPk(id);
        const response = await request(app).delete(`/restaurants/${id}`);
        expect(response.statusCode).toBe(200)
        expect(JSON.stringify(response.body)).toEqual(JSON.stringify(restaurant))
    })
});