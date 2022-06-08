import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Fetch daily", async () => {
    it("Fetching daily  with token", async () => {
        const response = await chai
            .request(app)
            .get(constants.dailyApi.fetchdailyurl)
            .set(
                "authtoken",
                constants.token
            );
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Fetching daily  with invalidtoken", async () => {
        const response = await chai
            .request(app)
            .get(constants.dailyApi.fetchdailyurl)
            .set(
                "authtoken",
                constants.invalidtoken
            );
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Fetching daily  without token", async () => {
        const response = await chai
            .request(app)
            .get(constants.dailyApi.fetchdailyurl)
           
        expect(response.status).to.be.eq(constants.unauthorise);
    });
 
 


});