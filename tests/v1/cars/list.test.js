const request = require("supertest");
const app = require("../../../app");

describe("GET /v1/cars", () => {
    it("should response with 200 as status code", async () => {
        return request(app)
            .get("/v1/cars")
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        cars: expect.arrayContaining([expect.any(Object)]),
                        meta: expect.objectContaining({
                            pagination: expect.any(Object),
                        }),
                    })
                );
            });
    });
});
