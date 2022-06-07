import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Get User Levels", () => {
    it("Get Levels For User with token", async () => {
        const response = await chai.request(app).get(constants.userApi.getUserlevelurl)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Get Levels For User without token", async () => {
        const response = await chai.request(app).get(constants.userApi.getUserlevelurl);
        expect(response.status).to.be.eq(constants.requestFail);
    });
});