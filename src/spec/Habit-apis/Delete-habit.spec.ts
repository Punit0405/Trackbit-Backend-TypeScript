import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";


chai.should();
chai.use(chaiHttp);

describe("Delete Habit", async () => {
  it("Deleting Habit  with token", async () => {
    const response = await chai
      .request(app)
      .delete(constants.habitApi.deleteHabiturl + constants.habitApi.actualdeletehabitId)
      .set(
        "authtoken",
        constants.token
      );
      console.log(response.body)
    expect(response.status).to.be.eq(constants.successCode);
  });
  it("Deleting Habit with invalid habitid with token", async () => {
    const response = await chai
      .request(app)
      .delete(constants.habitApi.deleteHabiturl + constants.habitApi.actualdeletehabitId)
      .set(
        "authtoken",
        constants.habitApi.invalidHabitId
      );
    expect(response.status).to.be.eq(constants.requestFail);
  });
  it("Deleting Habit of another user with token", async () => {
    const response = await chai
      .request(app)
      .delete(constants.habitApi.deleteHabiturl + constants.habitApi.anotherUserHabitId)
      .set(
        "authtoken",
        constants.habitApi.anotherUserHabitId
      );
    expect(response.status).to.be.eq(constants.requestFail);
  });
  it("Deleting non existing Habit  with token", async () => {
    const response = await chai
      .request(app)
      .delete(constants.habitApi.deleteHabiturl + constants.habitApi.deletehabitId)
      .set(
        "authtoken",
        constants.token
      );
    expect(response.status).to.be.eq(constants.notFound);
  });
  it("Deleting Habit without habitid  with token", async () => {
    const response = await chai
      .request(app)
      .delete(constants.habitApi.deleteHabiturl)
      .set(
        "authtoken",
        constants.token
      );
    expect(response.status).to.be.eq(constants.notFound);
  });
  it("Deleting challange Habit  with token", async () => {
    const response = await chai
      .request(app)
      .delete(constants.habitApi.deleteHabiturl + constants.habitApi.challangeHabitId)
      .set(
        "authtoken",
        constants.token
      );
    expect(response.status).to.be.eq(constants.requestFail);
  });
  it("Deleting   Habit  without token", async () => {
    const response = await chai
      .request(app)
      .delete(constants.habitApi.deleteHabiturl + constants.habitApi.deletehabitId);
    expect(response.status).to.be.eq(constants.requestFail);
  });
  it("Fetching Habit  with invalidtoken", async () => {
    const response = await chai
      .request(app)
      .delete(constants.habitApi.deleteHabiturl + constants.habitApi.deletehabitId)
      .set(
        "authtoken",
       constants.invalidtoken
      );
    expect(response.status).to.be.eq(constants.requestFail);
  });



});