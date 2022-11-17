const request = require("supertest");
const app = require("../../app");

describe("GET /", () => {
    it("should return 200 OK", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "OK",
            message: "BCR API is up and running!",
        });
    });

    it("should return 404 Not Found", async () => {
        const response = await request(app).get("/not-found");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            ...response.body,
        });
    });
});
