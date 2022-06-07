import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Get-Userinfo", () => {
    it("Getting User-Info with Auth-Token", async () => {
        const response = await chai.request(app)
            .get(constants.userApi.fetchUserdetailsurl)
            .set("authtoken", constants.token);
        expect(response).to.have.status(constants.successCode);
    });
    it("Getting User-Info without Auth-Token", async () => {
        const response = await chai.request(app)
            .get(constants.userApi.fetchUserdetailsurl)
            .set({ authToken: "" });
        expect(response).to.have.status(constants.requestFail);
    });
});