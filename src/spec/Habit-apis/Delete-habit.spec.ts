import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe.skip("Delete Habit", async () => {
  it("Deleting Habit 21 with token", async () => {
    const response = await chai
      .request(app)
      .delete("/api/v1/habit/deletehabit/6299fd026cea63461dfd6fa5")
      .set(
        "authtoken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDMyMTgwOH0.JiO2VDu8d3vcUA-aBct7_4HsLa04O62JfUkYvajR1zw"
      );
    expect(response.status).to.be.eq(200);
  });
  it("Deleting non existing Habit  with token", async () => {
    const response = await chai
      .request(app)
      .delete("/api/v1/habit/deletehabit/6299fdadc155384d22113588")
      .set(
        "authtoken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDMyMTgwOH0.JiO2VDu8d3vcUA-aBct7_4HsLa04O62JfUkYvajR1zw"
      );
    expect(response.status).to.be.eq(404);
  });
  it("Deleting Habit without habitid  with token", async () => {
    const response = await chai
      .request(app)
      .delete("/api/v1/habit/deletehabit/")
      .set(
        "authtoken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDMyMTgwOH0.JiO2VDu8d3vcUA-aBct7_4HsLa04O62JfUkYvajR1zw"
      );
    expect(response.status).to.be.eq(404);
  });
  it("Deleting challange Habit  with token", async () => {
    const response = await chai
      .request(app)
      .delete("/api/v1/habit/deletehabit/629af2f118e237aea678f156")
      .set(
        "authtoken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDMyMTgwOH0.JiO2VDu8d3vcUA-aBct7_4HsLa04O62JfUkYvajR1zw"
      );
    expect(response.status).to.be.eq(400);
  });
  it("Deleting   Habit  without token", async () => {
    const response = await chai
      .request(app)
      .delete("/api/v1/habit/deletehabit/6299e9744b4ec8009f5c4272");
    expect(response.status).to.be.eq(400);
  });
  it("Fetching Habit  with invalidtoken", async () => {
    const response = await chai
      .request(app)
      .delete("/api/v1/habit/deletehabit/6299e9744b4ec8009f5c4272")
      .set(
        "authtoken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzfh hththGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDMyMTgwOH0.JiO2VDu8d3vcUA-aBct7_4HsLa04O62JfUkYvajR1zw"
      );
    expect(response.status).to.be.eq(400);
  });



});