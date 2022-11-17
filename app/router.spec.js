const express = require("express");
const request = require("supertest");
const migrator = require("./migrator");
const app = express();
const router = require("./router");

// jest.setTimeout(20000);
jest.useFakeTimers('legacy')
app.use(express.json());
router.apply(app);

describe("router test", () => {
    beforeEach(async () => {
        return migrator()
    });

    it("logged in", (done) => {
        request(app)
        .post("/v1/auth/login")
        .send({email: "fikri@binar.co.id", password: "123456"})
        .expect(201)
        .then(res => {
            expect(res.body.accessToken).toBeTruthy()
            done()
        })
        .catch(done)
    });
});
