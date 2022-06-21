import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants.spec";

chai.should();
chai.use(chaiHttp);

describe("Joined challange", async () => {
    it("Joined  all the challagne  with token", async () => {
        const response = await chai
            .request(app)
            .get(constants.challangeApi.joinedChallagneUrl)
            .set(
                "authtoken",
                constants.token
            );
        expect(response.status).to.be.eq(constants.successCode);
    });

 

});