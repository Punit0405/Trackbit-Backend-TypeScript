import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Complete Daily", async () => {

    it("Complete User's daily with token ", async () => {
        const response = await chai.request(app)
            .get(constants.dailyApi.completedailyurl + constants.dailyApi.completeDailyId)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Complete Challagne's daily with token ", async () => {
        const response = await chai.request(app)
            .get(constants.dailyApi.completedailyurl + constants.dailyApi.completeChalangeDailyId)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Complete User's daily with token ", async () => {
        const response = await chai.request(app)
            .get(constants.dailyApi.completedailyurl + constants.dailyApi.completeChalangeDailyId);
        expect(response.status).to.be.eq(constants.unauthorise);
    });

    it("Complete User's challagnedaily with token ", async () => {
        const response = await chai.request(app)
            .get(constants.dailyApi.completedailyurl + constants.dailyApi.completeDailyId)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Complete User's daily without token ", async () => {
        const response = await chai.request(app)
            .get(constants.dailyApi.completedailyurl + constants.dailyApi.completeDailyId);
            
        expect(response.status).to.be.eq(constants.unauthorise);
    });
    it("Complete User's daily with invalidtoken ", async () => {
        const response = await chai.request(app)
            .get(constants.dailyApi.completedailyurl + constants.dailyApi.completeDailyId)
            .set("authtoken", constants.invalidtoken);
        expect(response.status).to.be.eq(constants.requestFail);
    });

});
