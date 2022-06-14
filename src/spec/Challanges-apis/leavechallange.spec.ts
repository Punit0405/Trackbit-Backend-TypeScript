import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Leave challange", async () => {
    it("Leaveing challange", async () => {
        const response = await chai
            .request(app)
            .get(constants.challangeApi.leaveChallagneUrl + constants.challangeApi.leaveChallangeId)
            .set(
                "authtoken",
                constants.token
            );
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Leaveing non existing challange", async () => {
        const response = await chai
            .request(app)
            .get(constants.challangeApi.leaveChallagneUrl + constants.challangeApi.actualdeletechallangeId)
            .set(
                "authtoken",
                constants.token
            );
        expect(response.status).to.be.eq(constants.notFound);
    });

 

});