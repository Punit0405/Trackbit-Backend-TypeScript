import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from '../constants';

chai.should();
chai.use(chaiHttp);

describe.skip("Fetch Habit", async () => {
  it("Fetching Habit  with token", async () => {
    const response = await chai
      .request(app)
      .get(constants.habitApi.fetchHabiturl)
      .set(
        "authtoken",
        constants.habitApi.token
      );
    expect(response.status).to.be.eq(200);
  });
  it("Fetching Habit  without token", async () => {
    const response = await chai
      .request(app)
      .get(constants.habitApi.fetchHabiturl);
    expect(response.status).to.be.eq(400);
  });
  it("Fetching Habit  with  Invalidtoken", async () => {
    const response = await chai
      .request(app)
      .get(constants.habitApi.fetchHabiturl)
      .set(
        "authtoken",
        constants.habitApi.invaldtoken
      );
    expect(response.status).to.be.eq(400);
  });


});