import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants.spec";

chai.should();
chai.use(chaiHttp);

describe("Fetch challange", async () => {
    it("Fetching all the challagne  with token", async () => {
        const response = await chai
            .request(app)
            .get(constants.challangeApi.fetchallchallangesUrl)
            .set(
                "authtoken",
                constants.token
            );
        expect(response.status).to.be.eq(constants.successCode);
    });

 

});