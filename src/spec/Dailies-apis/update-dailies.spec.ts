import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Update Daily", async () => {
  it("Daily update successfully", async () => {
    const response = await chai
      .request(app)
      .put(constants.dailyApi.updatedailyurl + constants.dailyApi.updatedailyId)
      .set("authtoken", constants.token)
      .send({
        "title":"gy ftyf tyf",
        "description":"From Ahmedabad We have to Buy this",
        "startDate":"2022-04-15",
        "tags":["Vegetables","Home"],
        "checklists":["Vegetables","Lemons","Apples"]
      });
    expect(response.status).to.be.eq(constants.successCode);
  });
  it("Daily update successfully without title and descripiton", async () => {
    const response = await chai
      .request(app)
      .put(constants.dailyApi.updatedailyurl + constants.dailyApi.updatedailyId)
      .set("authtoken", constants.token)
      .send({
        "startDate":"2022-04-15",
        "tags":["Vegetables","Home"],
        "checklists":["Vegetables","Lemons","Apples"]
      });
    expect(response.status).to.be.eq(constants.validationFail);
  });
  it("Daily update successfully description less than 10 characters", async () => {
    const response = await chai
      .request(app)
      .put(constants.dailyApi.updatedailyurl + constants.dailyApi.updatedailyId)
      .set("authtoken", constants.token)
      .send({
        "title":"gy ftyf tyf",
        "description":"From",
        "startDate":"2022-04-15",
        "tags":["Vegetables","Home"],
        "checklists":["Vegetables","Lemons","Apples"]
      });
    expect(response.status).to.be.eq(constants.validationFail);
  });
  it("Daily update successfully with title less than 6", async () => {
    const response = await chai
      .request(app)
      .put(constants.dailyApi.updatedailyurl + constants.dailyApi.updatedailyId)
      .set("authtoken", constants.token)
      .send({
        "title":"gyf",
        "description":"From Ahmedabad We have to Buy this",
        "startDate":"2022-04-15",
        "tags":["Vegetables","Home"],
        "checklists":["Vegetables","Lemons","Apples"]
      });
    expect(response.status).to.be.eq(constants.validationFail);
  });
  it("Daily update successfully with invalidToken", async () => {
    const response = await chai
      .request(app)
      .put(constants.dailyApi.updatedailyurl + constants.dailyApi.updatedailyId)
      .set("authtoken", constants.invalidtoken)
      .send({
        "title":"gy ftyf tyf",
        "description":"From Ahmedabad We have to Buy this",
        "startDate":"2022-04-15",
        "tags":["Vegetables","Home"],
        "checklists":["Vegetables","Lemons","Apples"]
      });
    expect(response.status).to.be.eq(constants.requestFail);
  });
  it("Daily update successfully without token", async () => {
    const response = await chai
      .request(app)
      .put(constants.dailyApi.updatedailyurl + constants.dailyApi.updatedailyId)
      .send({
        "title":"gy ftyf tyf",
        "description":"From Ahmedabad We have to Buy this",
        "startDate":"2022-04-15",
        "tags":["Vegetables","Home"],
        "checklists":["Vegetables","Lemons","Apples"]
    });
    expect(response.status).to.be.eq(constants.unauthorise);
  });
});
