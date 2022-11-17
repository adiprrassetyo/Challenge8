const express = require("express");
const request = require("supertest");

const app = express();
const router = require("./router");
const { InsufficientAccessError } = require("./errors");
const jwt = require("jsonwebtoken");

jest.setTimeout(20000);
app.use(express.json());
router.apply(app);

describe("whoami GET /v1/auth/whoami", () => {
  describe("whoami success", () => {
    let accessToken;
    const validAccount = {
      email: "fikri@binar.co.id",
      password: "123456",
    };

    beforeAll((done) => {
      request(app)
        .post("/v1/auth/login")
        .set("Content-Type", "application/json")
        .send({ email: validAccount.email, password: validAccount.password })
        .expect(201)
        .then((res) => {
          expect(res.body.accessToken).toBeTruthy();
          accessToken = res.body.accessToken;
          done();
        });
    });

    it("accessToken valid should return status code 200 and return user data from the valid token", (done) => {
      request(app)
        .get("/v1/auth/whoami")
        .set("Authorization", `Bearer ${accessToken}`)
        .set("Content-Type", "application/json")
        .expect(200)
        .then((res) => {
          expect(res.body.email).toEqual(validAccount.email);
          done();
        })
        .catch(done);
    });
  });
});
