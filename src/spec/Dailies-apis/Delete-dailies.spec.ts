import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Delete Daily", async () => {
    it("Deleting Daily  with token", async () => {
        const response = await chai
            .request(app)
            .delete(
                constants.dailyApi.deletedailyurl + constants.dailyApi.actualdailyId
            )
            .set("authtoken", constants.token);
        console.log(response.body);
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Deleting non existing Daily  with token", async () => {
        const response = await chai
            .request(app)
            .delete(
                constants.dailyApi.deletedailyurl + constants.dailyApi.actualdailyId
            )
            .set("authtoken", constants.token);
        console.log(response.body);
        expect(response.status).to.be.eq(constants.notFound);
    });
    it("Deleting Danother user daily daily  with token", async () => {
        const response = await chai
            .request(app)
            .delete(
                constants.dailyApi.deletedailyurl + constants.dailyApi.anotherUserdailyId
            )
            .set("authtoken", constants.token);
        console.log(response.body);
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Deleting challagne Daily  with token", async () => {
        const response = await chai
            .request(app)
            .delete(
                constants.dailyApi.deletedailyurl + constants.dailyApi.challangedailyId
            )
            .set("authtoken", constants.token);
        console.log(response.body);
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Deleting invalid daily  with token", async () => {
        const response = await chai
            .request(app)
            .delete(
                constants.dailyApi.deletedailyurl + constants.dailyApi.invalidailyId
            )
            .set("authtoken", constants.token);
        console.log(response.body);
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Deleting Daily  with invalidtoken", async () => {
        const response = await chai
            .request(app)
            .delete(
                constants.dailyApi.deletedailyurl + constants.dailyApi.actualdailyId
            )
            .set("authtoken", constants.invalidtoken);
        console.log(response.body);
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Deleting Daily  without token", async () => {
        const response = await chai
            .request(app)
            .delete(
                constants.dailyApi.deletedailyurl + constants.dailyApi.actualdailyId
            );
        console.log(response.body);
        expect(response.status).to.be.eq(constants.unauthorise);
    });


});
