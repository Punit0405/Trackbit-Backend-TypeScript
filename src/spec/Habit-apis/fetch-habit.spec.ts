import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe.skip("Fetch Habit", async () => {
  it("Fetching Habit  with token", async () => {
    const response = await chai
      .request(app)
      .get("/api/v1/habit/fetchhabit")
      .set(
        "authtoken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU"
      );
    expect(response.status).to.be.eq(200);
  });
  it("Fetching Habit  without token", async () => {
    const response = await chai
      .request(app)
      .get("/api/v1/habit/fetchhabit");
    expect(response.status).to.be.eq(400);
  });
  it("Fetching Habit  with  Invalidtoken", async () => {
    const response = await chai
      .request(app)
      .get("/api/v1/habit/fetchhabit")
      .set(
        "authtoken",
        "eyJhbGciOiJIUzI1NiIsInR5cthCI6IkpXVCJ9.eyJpZCghhwtrhrtIhuhuh6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU"
      );
    expect(response.status).to.be.eq(400);
  });


});