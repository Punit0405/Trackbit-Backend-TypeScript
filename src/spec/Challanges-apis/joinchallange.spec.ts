import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Join challange", async () => {
    it("Joining challange", async () => {
        const response = await chai
            .request(app)
            .get(constants.challangeApi.joinChallagneUrl + constants.challangeApi.joinChallangeId)
            .set(
                "authtoken",
                constants.token
            );
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Joining non existing challange", async () => {
        const response = await chai
            .request(app)
            .get(constants.challangeApi.joinChallagneUrl + constants.challangeApi.actualdeletechallangeId)
            .set(
                "authtoken",
                constants.token
            );
        expect(response.status).to.be.eq(constants.notFound);
    });

 

});