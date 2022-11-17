const request = require("supertest");
const app = require("../../../../app");

describe("DELETE /v1/cars/:id", () => {
    let car, accessTokenAdmin, accessTokenCustomer;

    beforeEach(async () => {
        accessTokenAdmin = await request(app).post("/v1/auth/login").send({
            email: "admin@gmail.com",
            password: "123",
        });

        accessTokenCustomer = await request(app).post("/v1/auth/login").send({
            email: "customer@gmail.com",
            password: "123",
        });

        car = await request(app).post("/v1/cars").set("Content-Type", "application/json").set("Authorization", `Bearer ${accessTokenAdmin.body.accessToken}`).send({
            name: "Ferrari Delete",
            price: 1000000,
            size: "MEDIUM",
            image: "https://source.unsplash.com/500x500",
        });

        return car, accessTokenAdmin, accessTokenCustomer;
    });

    it("should response with 204 as status code", async () => {
        return request(app)
            .delete("/v1/cars/" + car.body.id)
            .set("Authorization", `Bearer ${accessTokenAdmin.body.accessToken}`)
            .then((res) => {
                expect(res.status).toBe(204);
            });
    });

    it("should response with 401 as status code", async () => {
        return request(app)
            .delete("/v1/cars/" + car.body.id)
            .set("Authorization", `Bearer ${accessTokenCustomer.body.accessToken}`)
            .then((res) => {
                expect(res.status).toBe(401);
                if (res.body.details === null) {
                    expect(res.body).toEqual({
                        error: expect.objectContaining({
                            name: expect.any(String),
                            message: expect.any(String),
                            details: null,
                        }),
                    });
                    return;
                }
                expect(res.body).toEqual({
                    error: expect.objectContaining({
                        name: expect.any(String),
                        message: expect.any(String),
                        details: expect.objectContaining({
                            role: expect.any(String),
                            reason: expect.any(String),
                        }),
                    }),
                });
            });
    });

    afterEach(async () => {
        return request(app)
            .delete("/v1/cars/" + car.body.id)
            .set("Authorization", `Bearer ${accessTokenAdmin.body.accessToken}`);
    });
});
