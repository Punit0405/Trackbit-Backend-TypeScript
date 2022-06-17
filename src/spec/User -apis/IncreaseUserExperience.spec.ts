import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Increase User Experience", async () => {
    it("Successfully Increasing", async () => {
        const response = await chai.request(app).post(constants.userApi.increaseUserlevelurl)
            .set("authtoken", constants.token)
            .send({
                "experience": 15
            });
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Increasing Experience without body", async () => {
        const response = await chai.request(app).post(constants.userApi.increaseUserlevelurl)
            .set("authtoken", constants.token)
            .send({});
        expect(response.status).to.be.eq(constants.requestFail);
    });
});