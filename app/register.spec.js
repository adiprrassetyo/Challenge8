const express = require("express");
const request = require("supertest");

const app = express();
const router = require("./router");
const { EmailAlreadyTakenError } = require("./errors");
const { User } = require("./models");
const migrator = require("./migrator");

jest.setTimeout(20000);
app.use(express.json());
router.apply(app);

describe("Register POST /v1/auth/register", () => {
  describe("Register success", () => {
    beforeEach(async () => {
      return migrator()
    });
    it("New Email should return status code 201 and return accessToken", (done) => {
      const newAccount = {
        name: "Dhani",
        email: "dhani@binar.co.id",
        password: "123456",
      };

      request(app)
        .post("/v1/auth/register")
        .set("Content-Type", "application/json")
        .send({
          name: newAccount.name,
          email: newAccount.email,
          password: newAccount.password,
        })
        .expect(201)
        .then((res) => {
          expect(res.body.accessToken).toBeTruthy();
          done();
        })
        .catch(done);
    });
  });

  describe("Error", () => {
    it("Email already taken should return status code 422 and return error EmailAlreadyTakenError", (done) => {
      const accountWithRegisteredEmail = {
        name: "Fikri",
        email: "fikri@binar.co.id",
        password: "123456",
      };

      const expectedError = new EmailAlreadyTakenError(
        accountWithRegisteredEmail.email
      );

      const expectedResponse = {
        error: {
          name: expectedError.name,
          message: expectedError.message,
          details: expectedError.details,
        },
      };

      request(app)
        .post("/v1/auth/register")
        .set("Content-Type", "application/json")
        .send({
          name: accountWithRegisteredEmail.name,
          email: accountWithRegisteredEmail.email,
          password: accountWithRegisteredEmail.password,
        })
        .expect(422)
        .then((res) => {
          expect(res.body).toEqual(expectedResponse);
          done();
        })
        .catch(done);
    });

    describe("Empty Error", () => {
      it("Empty request body should return status code 500 and return TypeError", (done) => {
        const expectedResponse = {
          error: {
            name: "TypeError",
            message:
              "Cannot read properties of undefined (reading 'toLowerCase')",
            details: null,
          },
        };
        request(app)
          .post("/v1/auth/register")
          .set("Content-Type", "application/json")
          .send({})
          .expect(500)
          .then((res) => {
            expect(res.body).toEqual(expectedResponse);
            done();
          })
          .catch(done);
      });

      it("Empty name or email or password should return status code 500 and return Error", (done) => {
        const expectedResponse = {
          error: {
            name: "Error",
            message: "Illegal arguments: undefined, string",
            details: null,
          },
        };

        request(app)
          .post("/v1/auth/register")
          .set("Content-Type", "application/json")
          .send({ name: "Test", email: "test3@binar.co.id" })
          .expect(500)
          .then((res) => {
            expect(res.body).toEqual(expectedResponse);
            done();
          })
          .catch(done);
      });
    });
  });
});
