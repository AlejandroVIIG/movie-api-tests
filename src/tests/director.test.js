const request = require('supertest');
const app = require('../app');

const BASE_URL = "/directors";
let directorId;

test("POST -> /directors, should return status 201, res.body is defined, and res.body.firstName === newDirector.firstName",
    async () => {
        const newDirector = {
            firstName: "Jane",
            lastName: "Doe",
            nationality: "American",
            birthday: "1999-10-17",
            image: "lorem-ipsum-jane"
        }

        const res = await request(app).post(BASE_URL)
                                      .send(newDirector);
        
        directorId = res.body.id;
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.firstName).toBe(newDirector.firstName);
    }
);

test("GET -> /directors, should return status code 200, res.body is defined and res.body.length === 1",
    async () => {
        const res = await request(app).get(BASE_URL);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);
    }
);

test("PUT -> /directors/:id, should return status code 200, res.body is defined and res.body.firstName === Joanna",
    async () => {
        const res = await request(app).put(`${BASE_URL}/${directorId}`)
                                      .send({firstName: "Joanna"});

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.firstName).toBe("Joanna");
    }
);

test("DELETE -> /directors/:id, should return status code 204",
    async () => {
        const res = await request(app).delete(`${BASE_URL}/${directorId}`);

        expect(res.statusCode).toBe(204);
    }
);