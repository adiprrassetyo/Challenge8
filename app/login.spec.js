const express = require("express");
const request = require("supertest");

const app = express();
const router = require("./router");
const { WrongPasswordError, EmailNotRegisteredError} = require("./errors");

jest.setTimeout(20000);
app.use(express.json());
router.apply(app);

describe("Login POST /v1/auth/login", () => {
  describe("Login Successfull", () => {
    it("Login success should return status code 201 and return accessToken", (done) => {
      const validAccount = {
        email: "fikri@binar.co.id",
        password: "123456",
      };

      request(app)
        .post("/v1/auth/login")
        .set("Content-Type", "application/json")
        .send({ email: validAccount.email, password: validAccount.password })
        .expect(201)
        .then((res) => {
          expect(res.body.accessToken).toBeTruthy();
          done();
        })
        .catch(done);
    });
  });

  describe("Error on Login", () => {
    it("Unregistered Account should return status code 404 and return error EmailNotRegisteredError", (done) => {
      const invalidAccount = {
        email: "newemail@binar.co.id",
        password: "newpassword",
      };

      const expectedError = new EmailNotRegisteredError(invalidAccount.email);
      const expectedResponse = {
        error: {
          name: expectedError.name,
          message: expectedError.message,
          details: expectedError.details,
        },
      };

      request(app)
        .post("/v1/auth/login")
        .set("Content-Type", "application/json")
        .send({
          email: invalidAccount.email,
          password: invalidAccount.password,
        })
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual(expectedResponse);
          done();
        })
        .catch(done);
    });

    it("Wrong password should return status code 401 and return error WrongPasswordError", (done) => {
      const wrongPasswordAccount = {
        email: "fikri@binar.co.id",
        password: "wrongpassword123",
      };

      const expectedError = new WrongPasswordError();
      const expectedResponse = {
        error: {
          name: expectedError.name,
          message: expectedError.message,
          details: expectedError.details,
        },
      };

      request(app)
        .post("/v1/auth/login")
        .set("Content-Type", "application/json")
        .send({
          email: wrongPasswordAccount.email,
          password: wrongPasswordAccount.password,
        })
        .expect(401)
        .then((res) => {
          expect(res.body).toEqual(expectedResponse);
          done();
        })
        .catch(done);
    });
  });
});
