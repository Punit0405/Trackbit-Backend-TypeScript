import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Add Todo", async () => {
    it("Adding Habit  with all the parameters with token", async () => {
        const response = await chai
            .request(app)
            .post(constants.todoApi.addTodourl)
            .set("authtoken", constants.token)
            .send({
                "title": "Trackbit",
                "description": "Todo From Trackbi",
                "dueDate": "2022-05-20",
                "reminderDate": "2022-05-10",
                "reminderTime": "10:05",
                "tags": ["Groceries", "Home"],
                "difficulty": [false, true, false],
                "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
            });
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Adding Habit with all the parameters with invalidtoken", async () => {
        const response = await chai
            .request(app)
            .post(constants.todoApi.addTodourl)
            .set("authtoken", constants.invalidtoken)
            .send({
                "title": "Trackbit",
                "description": "Todo From Trackbi",
                "dueDate": "2022-05-20",
                "reminderDate": "2022-05-10",
                "reminderTime": "10:05",
                "tags": ["Groceries", "Home"],
                "difficulty": [false, true, false],
                "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
            });
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Adding Habit with all the parameters without token", async () => {
        const response = await chai
            .request(app)
            .post(constants.todoApi.addTodourl)
            .send({
                "title": "Trackbit",
                "description": "Todo From Trackbi",
                "dueDate": "2022-05-20",
                "reminderDate": "2022-05-10",
                "reminderTime": "10:05",
                "tags": ["Groceries", "Home"],
                "difficulty": [false, true, false],
                "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
            });
        expect(response.status).to.be.eq(constants.unauthorise);
    });
    it("Adding Habit without title and description all the parameters with token", async () => {
        const response = await chai
            .request(app)
            .post(constants.todoApi.addTodourl)
            .set("authtoken", constants.token)
            .send({
                "dueDate": "2022-05-20",
                "reminderDate": "2022-05-10",
                "reminderTime": "10:05",
                "tags": ["Groceries", "Home"],
                "difficulty": [false, true, false],
                "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
            });
        expect(response.status).to.be.eq(constants.validationFail);
    });
    it("Adding Habit without description all the parameters with token", async () => {
        const response = await chai
            .request(app)
            .post(constants.todoApi.addTodourl)
            .set("authtoken", constants.token)
            .send({
                "title": "Trackbit",
                "dueDate": "2022-05-20",
                "reminderDate": "2022-05-10",
                "reminderTime": "10:05",
                "tags": ["Groceries", "Home"],
                "difficulty": [false, true, false],
                "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
            });
        expect(response.status).to.be.eq(constants.validationFail);
    });
    it("Adding Habit without title the parameters with token", async () => {
        const response = await chai
            .request(app)
            .post(constants.todoApi.addTodourl)
            .set("authtoken", constants.token)
            .send({
                "description": "Todo From Trackbi",
                "dueDate": "2022-05-20",
                "reminderDate": "2022-05-10",
                "reminderTime": "10:05",
                "tags": ["Groceries", "Home"],
                "difficulty": [false, true, false],
                "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
            });
        expect(response.status).to.be.eq(constants.validationFail);
    });

});
