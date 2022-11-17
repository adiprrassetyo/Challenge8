const request = require("supertest");
const app = require("../../../../app");
const dayjs = require("dayjs");
dayjs().format();

describe("POST /v1/cars/:id/rent", () => {
    let car, accessTokenAdmin, accessTokenCustomer;
    let rentStartedAt = dayjs().add(1, "day");
    let rentEndedAt = dayjs(rentStartedAt).add(1, "day");

    rentStartedAt = rentStartedAt.$d;
    rentEndedAt = rentEndedAt.$d;

    beforeAll(async () => {
        accessTokenAdmin = await request(app).post("/v1/auth/login").send({
            email: "admin@gmail.com",
            password: "123",
        });

        accessTokenCustomer = await request(app).post("/v1/auth/login").send({
            email: "customer@gmail.com",
            password: "123",
        });

        car = await request(app).post("/v1/cars").set("Content-Type", "application/json").set("Authorization", `Bearer ${accessTokenAdmin.body.accessToken}`).send({
            name: "Ferrari Rental",
            price: 1000000,
            size: "MEDIUM",
            image: "https://source.unsplash.com/500x500",
        });

        return car;
    });

    it("should response with 201 as status code", async () => {
        return await request(app)
            .post("/v1/cars/" + car.body.id + "/rent")
            .set("Authorization", `Bearer ${accessTokenCustomer.body.accessToken}`)
            .set("Content-Type", "application/json")
            .send({rentStartedAt, rentEndedAt})
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toEqual(res.body);
            });
    });

    it("should response with 401 as status code", async () => {
        return await request(app)
            .post("/v1/cars/" + car.body.id + "/rent")
            .set("Authorization", `Bearer ${accessTokenAdmin.body.accessToken}`)
            .set("Content-Type", "application/json")
            .send({rentStartedAt, rentEndedAt})
            .then((res) => {
                expect(res.statusCode).toBe(401);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        error: expect.objectContaining({
                            name: expect.any(String),
                            message: expect.any(String),
                            details: expect.objectContaining({
                                role: expect.any(String),
                                reason: expect.any(String),
                            }),
                        }),
                    })
                );
            });
    });

    it("should response with 422 as status code", async () => {
        return await request(app)
            .post("/v1/cars/" + car.body.id + "/rent")
            .set("Authorization", `Bearer ${accessTokenCustomer.body.accessToken}`)
            .set("Content-Type", "application/json")
            .send({rentStartedAt, rentEndedAt})
            .then((res) => {
                expect(res.statusCode).toBe(422);
                expect(res.body).toEqual(res.body);
            });
    });
});
