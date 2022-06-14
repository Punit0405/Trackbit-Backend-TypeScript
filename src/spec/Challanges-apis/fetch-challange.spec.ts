import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Fetch challange", async () => {
    it("Fetching challagne  with token", async () => {
        const response = await chai
            .request(app)
            .get(constants.challangeApi.fetchchallangeurl)
            .set(
                "authtoken",
                constants.token
            );
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Fetching challagne  with invalidtoken", async () => {
        const response = await chai
            .request(app)
            .get(constants.challangeApi.fetchchallangeurl)
            .set(
                "authtoken",
                constants.invalidtoken
            );
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Fetching challagne  without token", async () => {
        const response = await chai
            .request(app)
            .get(constants.challangeApi.fetchchallangeurl)
        expect(response.status).to.be.eq(constants.unauthorise);
    });

});