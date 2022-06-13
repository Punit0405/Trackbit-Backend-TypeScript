import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Delete Challanges", async () => {
    
    it.skip("Delete Challange Successfully", async () => {
        const response = await chai.request(app)
            .delete(constants.challangeApi.deletechallangeurl + constants.challangeApi.challangeId)
            .set("authtoken", constants.token);
        console.log(response);
        expect(response.status).to.be.eq(constants.successCode);
    });

});