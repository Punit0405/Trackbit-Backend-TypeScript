import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Delete Todo", async () => {

    it.skip("Successfully Delete Todo", async () => {
        const response = await chai.request(app)
            .delete(constants.todoApi.deleteTodourl + constants.todoApi.deleteTodoId)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.successCode);
    });


    it("Todo not found", async () => {
        const response = await chai.request(app)
            .delete(constants.todoApi.deleteTodourl + constants.todoApi.deleteTodoNotFound)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.notFound);
    });

    it("Invalid todo Id", async () => {
        const response = await chai.request(app)
            .delete(constants.todoApi.deleteTodourl + constants.todoApi.deleteTodoInvalidId)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.requestFail);
    });

    it("Deleting todo of joined Todo", async () => {
        const response = await chai.request(app)
            .delete(constants.todoApi.deleteTodourl + constants.todoApi.deleteTodotypefalse)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.requestFail);
    });

    it("Deleting Todo of others user", async () => {
        const response = await chai.request(app)
            .delete(constants.todoApi.deleteTodourl + constants.todoApi.deleteTodoOfOthers)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.requestFail);
    });

});
