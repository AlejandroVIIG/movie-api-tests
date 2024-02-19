require("../models");
const request = require("supertest");
const app = require("../app");
const Director = require("../models/Director");
const Actor = require("../models/Actor");
const Genre = require("../models/Genre");

const BASE_URL = "/movies";
let movie;
let actor;
let director;
let genre;
let movieId;

test("POST -> /movies, should return status code 201, res.body is defined and res.body.name === movie.name",
    async () => {
        const movie = {
            name: "American Movie",
            releaseYear: 2019,
            synopsis: "lorem synopsis",
            image: "lorem-ipsum-american-movie",
        }

        const res = await request(app).post(BASE_URL)
                                      .send(movie);

        movieId = res.body.id;

        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.name).toBe(movie.name);
    }
);

test("GET -> /movies, should return status code 200, res.body is defined and res.body.length === 1",
    async () => {
        const res = await request(app).get(BASE_URL);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);
    }
);

test("PUT -> /movies/:id, should return status code 200, res.body is defined and res.body.name === Another American Movie",
    async () => {
        const res = await request(app).put(`${BASE_URL}/${movieId}`)
                                      .send({name: "Another American Movie"});

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.name).toBe("Another American Movie");
    }
);

test("POST -> /movies/:id/actors, should return status code 200, res.body is defined and res.body.length === 1",
    async () => {
        actor = await Actor.create(
            {
                firstName: "John",
                lastName: "Notdoe",
                nationality: "American",
                birthday: "1999-12-30",
                image: "loren_ipsum_doe"
            }
        );

        const res = await request(app).post(`${BASE_URL}/${movieId}/actors`)
                                      .send([actor.id]);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);

        await actor.destroy();
    }
);

test("POST -> /movies/:id/directors, should return status code 200, res.body is defined and res.body.length === 1",
    async () => {
        director = await Director.create(
            {
                firstName: "Jane",
                lastName: "Doe",
                nationality: "American",
                birthday: "1985-10-17",
                image: "lorem-ipsum-jane"
            }
        );

        const res = await request(app).post(`${BASE_URL}/${movieId}/directors`)
                                      .send([director.id]);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);

        await director.destroy();
    }
);

test("POST -> /movies/:id/genres, should return status code 200, res.body is defined and res.body.length === 1",
    async () => {
        genre = await Genre.create({name: "Drama"});

        const res = await request(app).post(`${BASE_URL}/${movieId}/genres`)
                                      .send([genre.id]);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);
        
        await genre.destroy()
    }
);

test("DELETE -> /movies/:id, should return status code 204",
    async () => {
        const res = await request(app).delete(`${BASE_URL}/${movieId}`);

        expect(res.statusCode).toBe(204);
    }
);