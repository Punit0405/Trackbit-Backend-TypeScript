import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";


chai.should();
chai.use(chaiHttp);

describe("Decrease User Experience", async () => {
    it("Successfully Decreasing", async () => {
        const response = await chai.request(app).post(constants.userApi.decreaseUserExperienceurl)
            .set("authtoken", constants.token)
            .send({
                "health": 50
            });
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Decreasing Experience without body", async () => {
        const response = await chai.request(app).post(constants.userApi.decreaseUserExperienceurl)
            .set("authtoken", constants.token)
            .send({});
        expect(response.status).to.be.eq(constants.requestFail);
    });
});