import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Update Challanges", async () => {
    it("Update Challanges Successfully", async () => {
        const response = await chai.request(app).put(constants.challangeApi.updatechallangeurl + constants.challangeApi.updatechallangeId)
            .set("authtoken", constants.token)
            .send({
                "title": "Challange Given By Punit",
                "description": "From Ahmedabad We have to Buy this"
            });
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Update Challanges with invalid Id", async () => {
        const response = await chai.request(app).put(constants.challangeApi.updatechallangeurl + constants.challangeApi.updatechallangeInvalidId)
            .set("authtoken", constants.token)
            .send({
                "title": "Challange Given By Punit",
                "description": "From Ahmedabad We have to Buy this"
            });
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Update Challanges with Id not exist", async () => {
        const response = await chai.request(app).put(constants.challangeApi.updatechallangeurl + constants.challangeApi.updatechallangeNotFound)
            .set("authtoken", constants.token)
            .send({
                "title": "Challange Given By Punit",
                "description": "From Ahmedabad We have to Buy this"
            });
        expect(response.status).to.be.eq(constants.notFound);
    });
    it("Update Challanges with Id not exist", async () => {
        const response = await chai.request(app).put(constants.challangeApi.updatechallangeurl + constants.challangeApi.updatechallangeNotOfAccount)
            .set("authtoken", constants.token)
            .send({
                "title": "Challange Given By Punit",
                "description": "From Ahmedabad We have to Buy this"
            });
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Update Challange without token", async () => {
        const response = await chai.request(app).put(constants.challangeApi.updatechallangeurl + constants.challangeApi.updatechallangeId)
            .send({
                "title": "Challange Given By Punit",
                "description": "From Ahmedabad We have to Buy this"
            });
        expect(response.status).to.be.eq(constants.unauthorise);
    });
});
