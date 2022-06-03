import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("Add Habit", async () => {
  it("Adding Habit with all the parameters with token", async () => {
    const response = await chai
      .request(app)
      .post("/api/v1/habit/addhabit")
      .set(
        "authtoken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU"
      )
      .send({
        "title":"Habit as 1450",
        "description":"Leave Smoking in 2100 Days",
        "habitType":[true,false],
        "duration":[false,true,false],
        "tags":["Smoking0","Health0"],
        "reminder": "14:50:00"
    });
    expect(response.status).to.be.eq(200);
  });
  it("Adding Habit with all the parameters with invalid token", async () => {
    const response = await chai
      .request(app)
      .post("/api/v1/habit/addhabit")
      .set(
        "authtoken",
        "eyJhbGciOiJIUzI1NiIsInR5csCI6IkpXVCJ9.eyJpZCbggdgsI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU"
      )
      .send({
        "title":"Habit as 1450",
        "description":"Leave Smoking in 2100 Days",
        "habitType":[true,false],
        "duration":[false,true,false],
        "tags":["Smoking0","Health0"],
        "reminder": "14:50:00"
    });
    expect(response.status).to.be.eq(400);
  });
  it("Adding Habit with all the parameters without token", async () => {
    const response = await chai
      .request(app)
      .post("/api/v1/habit/addhabit")
      .send({
        "title":"Habit as 1450",
        "description":"Leave Smoking in 2100 Days",
        "habitType":[true,false],
        "duration":[false,true,false],
        "tags":["Smoking0","Health0"],
        "reminder": "14:50:00"
    });
    expect(response.status).to.be.eq(400);
  });
  it("Adding Habit with all the parameters but title less than 6 characters with token", async () => {
    const response = await chai
      .request(app)
      .post("/api/v1/habit/addhabit")
      .set(
        "authtoken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU"
      )
      .send({
        "title":"Habi",
        "description":"Leave Smoking in 2100 Days",
        "habitType":[true,false],
        "duration":[false,true,false],
        "tags":["Smoking0","Health0"],
        "reminder": "14:50:00"
    });
    expect(response.status).to.be.eq(422);
  });
  it("Adding Habit with all the parameters but description less than 10 characters with token", async () => {
    const response = await chai
      .request(app)
      .post("/api/v1/habit/addhabit")
      .set(
        "authtoken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU"
      )
      .send({
        "title":"Habibfhb hgbyubuy",
        "description":"Leave",
        "habitType":[true,false],
        "duration":[false,true,false],
        "tags":["Smoking0","Health0"],
        "reminder": "14:50:00"
    });
    expect(response.status).to.be.eq(422);
  });
  it("Adding Habit with all the parameters without title and description with token", async () => {
    const response = await chai
      .request(app)
      .post("/api/v1/habit/addhabit")
      .set(
        "authtoken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU"
      )
      .send({
        "habitType":[true,false],
        "duration":[false,true,false],
        "tags":["Smoking0","Health0"],
        "reminder": "14:50:00"
    });
    expect(response.status).to.be.eq(422);
  });
});
