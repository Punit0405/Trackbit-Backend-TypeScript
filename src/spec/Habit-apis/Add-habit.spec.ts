import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Add Habit", async () => {
  it("Adding Habit with all the parameters with token", async () => {
    const response = await chai
      .request(app)
      .post(constants.habitApi.addHabiturl)
      .set("authtoken", constants.token)
      .send({
        title: "Habit as 1450",
        description: "Leave Smoking in 2100 Days",
        habitType: [true, false],
        duration: [false, true, false],
        tags: ["Smoking0", "Health0"],
        reminder: "14:50:00",
      });
    expect(response.status).to.be.eq(constants.successCode);
  });
  it("Adding Habit with all the parameters with invalid token", async () => {
    const response = await chai
      .request(app)
      .post(constants.habitApi.addHabiturl)
      .set("authtoken", constants.invalidtoken)
      .send({
        title: "Habit as 1450",
        description: "Leave Smoking in 2100 Days",
        habitType: [true, false],
        duration: [false, true, false],
        tags: ["Smoking0", "Health0"],
        reminder: "14:50:00",
      });
    expect(response.status).to.be.eq(constants.requestFail);
  });
  it("Adding Habit with all the parameters without token", async () => {
    const response = await chai
      .request(app)
      .post(constants.habitApi.addHabiturl)
      .send({
        title: "Habit as 1450",
        description: "Leave Smoking in 2100 Days",
        habitType: [true, false],
        duration: [false, true, false],
        tags: ["Smoking0", "Health0"],
        reminder: "14:50:00",
      });
    expect(response.status).to.be.eq(constants.requestFail);
  });
  it("Adding Habit with all the parameters but title less than 6 characters with token", async () => {
    const response = await chai
      .request(app)
      .post(constants.habitApi.addHabiturl)
      .set("authtoken", constants.token)
      .send({
        title: "Habi",
        description: "Leave Smoking in 2100 Days",
        habitType: [true, false],
        duration: [false, true, false],
        tags: ["Smoking0", "Health0"],
        reminder: "14:50:00",
      });
    expect(response.status).to.be.eq(constants.validationFail);
  });
  it("Adding Habit with all the parameters but description less than 10 characters with token", async () => {
    const response = await chai
      .request(app)
      .post(constants.habitApi.addHabiturl)
      .set("authtoken", constants.token)
      .send({
        title: "Habibfhb hgbyubuy",
        description: "Leave",
        habitType: [true, false],
        duration: [false, true, false],
        tags: ["Smoking0", "Health0"],
        reminder: "14:50:00",
      });
    expect(response.status).to.be.eq(constants.validationFail);
  });
  it("Adding Habit with all the parameters without title and description with token", async () => {
    const response = await chai
      .request(app)
      .post(constants.habitApi.addHabiturl)
      .set("authtoken", constants.token)
      .send({
        habitType: [true, false],
        duration: [false, true, false],
        tags: ["Smoking0", "Health0"],
        reminder: "14:50:00",
      });
    expect(response.status).to.be.eq(constants.validationFail);
  });
});
