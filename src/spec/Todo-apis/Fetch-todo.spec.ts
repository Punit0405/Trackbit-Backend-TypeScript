import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe.skip("Fetch Todo", async () => {
    it("Successfully Fetch todo", async () => {
        const response = await chai.request(app)
            .get(constants.todoApi.fetchTodourl)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Successfully Fetch without token todo", async () => {
        const response = await chai.request(app)
            .get(constants.todoApi.fetchTodourl)
        expect(response.status).to.be.eq(constants.unauthorise);
    });

    it("Fetching todo with invalid token", async () => {
        const response = await chai.request(app)
            .get(constants.todoApi.fetchTodourl)
            .set("authtoken", constants.invalidtoken);
        expect(response.status).to.be.eq(constants.requestFail);
    });

});
