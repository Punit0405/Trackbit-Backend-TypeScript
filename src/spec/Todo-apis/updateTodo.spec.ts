import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Update Todo", async () => {
    it("Todo update successfully", async () => {
        const response = await chai
            .request(app)
            .put(constants.todoApi.updateTodoUrl + constants.todoApi.updateTodoId)
            .set("authtoken", constants.token)
            .send({
                
                    "title":"Trackbit",
                    "description":"From Ahmedabad We have to Buy this",
                    "dueDate":"2022-04-15",
                    "tags":["Vegetables","Home"],
                    "checklists":["Vegetables","Lemons","Apples"]
                
            });
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Todo update successfully", async () => {
        const response = await chai
            .request(app)
            .put(constants.todoApi.updateTodoUrl + constants.todoApi.updateTodoId)
            .set("authtoken", constants.token)
            .send({
                
                    "title":"Trackbit",
                    "description":"From Ahmedabad We have to Buy this",
                    "dueDate":"2022-04-15",
                    "tags":["Vegetables","Home"],
                    "checklists":["Vegetables","Lemons","Apples"]
                
            });
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Todo update successfully without token", async () => {
        const response = await chai
            .request(app)
            .put(constants.todoApi.updateTodoUrl + constants.todoApi.updateTodoId)
            .send({
                
                    "title":"Trackbit",
                    "description":"From Ahmedabad We have to Buy this",
                    "dueDate":"2022-04-15",
                    "tags":["Vegetables","Home"],
                    "checklists":["Vegetables","Lemons","Apples"]
                
            });
        expect(response.status).to.be.eq(constants.unauthorise);
    });
    it("Todo update successfully with invalid token", async () => {
        const response = await chai
            .request(app)
            .put(constants.todoApi.updateTodoUrl + constants.todoApi.updateTodoId)
            .set("authtoken", constants.invalidtoken)
            .send({
                
                    "title":"Trackbit",
                    "description":"From Ahmedabad We have to Buy this",
                    "dueDate":"2022-04-15",
                    "tags":["Vegetables","Home"],
                    "checklists":["Vegetables","Lemons","Apples"]
                
            });
        expect(response.status).to.be.eq(constants.requestFail);
    });
    
});
