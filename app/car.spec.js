const express = require("express");
const request = require("supertest");

const app = express();
const router = require("./router");
const { Car } = require("./models");

// jest.setTimeout(20000);
jest.useFakeTimers('legacy')
app.use(express.json());
router.apply(app);

describe("Get Car List GET /v1/cars", () => {
  describe("Get Car Success ", () => {
    it("Get Car succes should be returning status code 200 and return list of cars", (done) => {
      request(app)
        .get("/v1/cars")
        .expect(200)
        .then((res) => {
          expect(res.body.cars).toBeDefined();
          done();
        })
        .catch(done);
    });
  });
});
