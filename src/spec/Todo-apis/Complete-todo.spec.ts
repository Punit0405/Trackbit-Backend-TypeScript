import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Complete Todo", async () => {

    it("Complete User's todo with token ", async () => {
        const response = await chai.request(app)
            .get(constants.todoApi.completeTodourl + constants.todoApi.completeTodoId)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Complete Challagne's todo with token ", async () => {
        const response = await chai.request(app)
            .get(constants.todoApi.completeTodourl + constants.todoApi.completeChallangeTodoId)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Complete User's todo with token ", async () => {
        const response = await chai.request(app)
            .get(constants.todoApi.completeTodourl + constants.todoApi.completeChallangeTodoId);
        expect(response.status).to.be.eq(constants.unauthorise);
    });
    it("Complete User's challagnetodo with token ", async () => {
        const response = await chai.request(app)
            .get(constants.todoApi.completeTodourl + constants.todoApi.completeTodoId)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Complete User's todo without token ", async () => {
        const response = await chai.request(app)
            .get(constants.todoApi.completeTodourl + constants.todoApi.completeTodoId);     
        expect(response.status).to.be.eq(constants.unauthorise);
    });
    it("Complete User's todo with invalidtoken ", async () => {
        const response = await chai.request(app)
            .get(constants.todoApi.completeTodourl + constants.todoApi.completeTodoId)
            .set("authtoken", constants.invalidtoken);
        expect(response.status).to.be.eq(constants.requestFail);
    });

});
