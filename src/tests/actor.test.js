const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");

const BASE_URL = "/actors";
let actorId;

test("POST -> /actors, should return status code 201, res.body is defined, and res.body.name === newActor.name",
    async () => {
        newActor = {
            firstName: "John",
            lastName: "Doe",
            nationality: "American",
            birthday: "1985-12-30",
            image: "loren_ipsum_doe"
        };
        
        const res = await request(app).post(BASE_URL)
                                      .send(newActor);
        
        actorId = res.body.id;

        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.firstName).toBe(newActor.firstName);
    }
);

test("GET -> /actors, should return status code 200, res.body is defined and res.body.length === 1",
    async () => {
        const res = await request(app).get(BASE_URL);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);
    }
);

test("PUT -> /actors/:id, should return status code 200, res.body is defined, and res.body.firstName === Jonathan",
    async () => {
        const res = await request(app).put(`${BASE_URL}/${actorId}`)
                                      .send({ firstName: "Jonathan"});

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.firstName).toBe("Jonathan");
    }
);

test("DELETE -> /actors/:id, should return status code 204, and deleted actor message",
    async () => {
        const res = await request(app).delete(`${BASE_URL}/${actorId}`);

        expect(res.status).toBe(204);
    }
);