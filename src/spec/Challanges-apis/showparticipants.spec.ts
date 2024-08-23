import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants.spec";

chai.should();
chai.use(chaiHttp);

describe("Show participants", async () => {
    it("Fetching participants of the challagne  with token", async () => {
        const response = await chai
            .request(app)
            .get(constants.challangeApi.showparticipantsUrl + constants.challangeApi.showparticipantsid)
            .set(
                "authtoken",
                constants.token
            );
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Fetching participants of the another user challagne  with token", async () => {
        const response = await chai
            .request(app)
            .get(constants.challangeApi.showparticipantsUrl + constants.challangeApi.updatechallangeNotOfAccount)
            .set(
                "authtoken",
                constants.token
            );
        expect(response.status).to.be.eq(constants.unauthorise);
    });
    it("Fetching participants of the non existing challange with token", async () => {
        const response = await chai
            .request(app)
            .get(constants.challangeApi.showparticipantsUrl + constants.challangeApi.actualdeletechallangeId)
            .set(
                "authtoken",
                constants.token
            );
        expect(response.status).to.be.eq(constants.notFound);
    });

 

});