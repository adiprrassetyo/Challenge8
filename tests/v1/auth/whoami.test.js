const request = require("supertest");
const app = require("../../../app");

describe("GET /v1/auth/whoami", () => {
    it("should response with 200 as status code", async () => {
        const accessToken = await request(app).post("/v1/auth/login").send({
            email: "customer@gmail.com",
            password: "123",
        });

        return request(app)
            .get("/v1/auth/whoami")
            .set("Authorization", `Bearer ${accessToken.body.accessToken}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual({
                    id: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                    image: null,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                });
            });
    });

    it("should response with 401 as status code", async () => {
        return request(app)
            .get("/v1/auth/whoami")
            .set("Authorization", `Bearer ${"invalidtoken"}`)
            .then((res) => {
                expect(res.statusCode).toBe(401);
                expect(res.body).toEqual({
                    error: {
                        name: expect.any(String),
                        message: expect.any(String),
                        details: null,
                    },
                });
            });
    });
});
