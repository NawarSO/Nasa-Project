require('dotenv').config();
const request = require('supertest');
const app = require('../../app');
const {mongoConnect, 
    mongoDisconnect,
} = require('./../../services/mongo');

describe('Launches API', ()=> {
    beforeAll(async ()=>{
        await mongoConnect();
    });
    afterAll(async()=>{
        await mongoDisconnect();
    })

    describe("Test get /launches", () =>{
    
        test("It should respond with 200 success ", async ()=>{
            const response = await request(app).get('/v1/launches').expect(200);
          //  .expect('Content-Type, /any string/ ')  // Here we test if the response is matching the string
          //  .expect(response.statusCode).toBe(200); 

        });
    });

    describe("Test Post /launches",()=>{
        const completeData = {
            mission: "Nawar-mission",
            rocket: 'Nawar-rocket',
            target:"Kepler-62 f",
            launchDate: 'july 26,2030',
        };
        const dataWithoutdate = {
            mission: "Nawar-mission",
            rocket: 'Nawar-rocket',
            target:"Kepler-62 f",
        };
        const dataWithInvalidDate = {
            mission: "Nawar-mission",
            rocket: 'Nawar-rocket',
            target:"Kepler-62 f",
            launchDate: 'Naw',
        };
        test("It should response with 201 created", async ()=>{
            const response = await request(app).post('/v1/launches').send(completeData)
            .expect('Content-Type', /json/)
            .expect(201);
            const requestDate = new Date (completeData.launchDate).valueOf();
            const responseDate = new Date (response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
            expect(response.body).toMatchObject(dataWithoutdate)
        });

        test("it should catch Missing required launch property ", async () =>{
            const response = await request(app).post('/v1/launches').send(dataWithoutdate)
            .expect(400)
            .expect('Content-Type', /json/)
            
            expect(response.body).toStrictEqual({
                    error :"Missing required launch property"
                });
        }); 
        test("it should catch Enter a valid date", async ()=>{
            const response = await request(app).post('/v1/launches').send(dataWithInvalidDate)
                .expect(400)
                .expect('Content-Type', /json/)
            expect(response.body).toStrictEqual({
                error: "Enter a valid date"
            });
        });
    });
        
});


