import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Delete Todo", async () => {

    it("Successfully Delete Todo", async () => {
        const response = await chai.request(app)
            .delete(constants.todoApi.deleteTodourl + constants.todoApi.deleteTodoId)
            .set("authtoken", constants.token);
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Successfully with invalid token  Delete Todo", async () => {
        const response = await chai.request(app)
            .delete(constants.todoApi.deleteTodourl + constants.todoApi.deleteTodoId)
            .set("authtoken", constants.invalidtoken);
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Successfully without token Delete Todo", async () => {
        const response = await chai.request(app)
            .delete(constants.todoApi.deleteTodourl + constants.todoApi.deleteTodoId)
        expect(response.status).to.be.eq(constants.unauthorise);
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
