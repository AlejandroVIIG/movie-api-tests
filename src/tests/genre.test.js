require("../models");
const request = require("supertest");
const app = require("../app");

const BASE_URL = "/genres";
let genreId;

test("POST -> '/genres' should return status code 201, res.body is defined and res.body.name = genre.name",
    async () => {
        const newGenre = {name: "Thriller"};
        const res = await request(app).post(BASE_URL)
                                      .send(newGenre);

        genreId = res.body.id;
        
        expect(res.status).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.name).toBe(newGenre.name);
    }
);

test("GET -> /genres should return status code 200, res.body is defined and res.body.length === 1",
    async () => {
        const res = await request(app).get(BASE_URL);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);
    }
);

test("PUT -> /genres/:id should return status code 200, res.body is defined, and res.body.name === 'Horror'",
    async () => {
        const res = await request(app).put(`${BASE_URL}/${genreId}`)
                                        .send({name: "Horror"});

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.name).toBe("Horror");
    }
);

test("DELETE -> /genres/:id, should return status code 204",
    async () => {
        const res = await request(app).delete(`${BASE_URL}/${genreId}`);

        expect(res.statusCode).toBe(204);
    }
);