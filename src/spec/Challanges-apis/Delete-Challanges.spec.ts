import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Delete Challanges", async () => {
    
    it("Delete Challange Successfully", async () => {
        const response = await chai.request(app)
            .delete(constants.challangeApi.deletechallangeurl + constants.challangeApi.actualdeletechallangeId)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.successCode);
    });

});