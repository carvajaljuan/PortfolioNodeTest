import request from "supertest";
import faker from "faker";
import app from "../../src/app";

const data = [];
let newData = {};

beforeEach(() => {
  newData = {
    nameval: faker.name.findName(),
    lastname: faker.name.findName(),
    description: faker.text.findName(),
    job: faker.name.findName(),
    phone: faker.number.findName(),
    email: faker.internet.email().toLowerCase(),
    experienceSum: faker.number.findName(),
    experience: faker.text.findName(),
    twitter: faker.name.findName(),
    instagram: faker.name.findName(),
    linkedin: faker.name.findName(),
    imageurl: faker.internet.email().toLowerCase(),
  };
});
describe("UserTest", () => {
  describe("GET getportfolio", () => {
    test("get and res user portfolio", async () => {
      await request(app)
        .post("/getportfolio")
        .expect(res)
        .expect((res) => {
          data.push(res);
        });
    });
    describe("POST updateportfolio", () => {
      test("Update portfolio info", async () => {
        await request(app)
          .post("/updateportfolio")
          .send(newData)
          .expect(res)
          .expect((res) => {
            data.push(res);
          });
      });
    });
  });
});
