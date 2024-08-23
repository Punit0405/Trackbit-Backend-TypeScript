import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants.spec";

chai.should();
chai.use(chaiHttp);

describe("Add Challanges", async () => {
    it("Add Challanges Successfully", async () => {
        const response = await chai.request(app).post(constants.challangeApi.addchallangeurl)
            .set("authtoken", constants.token)
            .send({
                "title": "Challange Added on 11 May 2022",
                "description": "Challange Added for flutter team",
                "experience": 10,
                "habits": [{
                    "title": "Habits for flutter",
                    "description": "Desc 1dfadsvdd",
                    "habitType": true,
                    "tags": ["School"]
                }],
                "todos": [{
                    "title": "Buy Groceries",
                    "description": "From Dilip Kirana Store We have to Buy this",
                    "dueDate": "2022-04-20",
                    "tags": ["Groceries", "Home"],
                    "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
                }],
                "dailies": [{
                    "title": "Exercise",
                    "description": "Pushups For 10 minutes",
                    "startDate": "2022-04-20",
                    "days": [true, false, false, false, true, true, true],
                    "tags": ["Groceries", "Home"],
                    "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
                }]
            });
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Add Challanges Successfully without habits ,todos , dailies", async () => {
        const response = await chai.request(app).post(constants.challangeApi.addchallangeurl)
            .set("authtoken", constants.token)
            .send({
                "title": "Challange Added on 11 May 2022",
                "description": "Challange Added for flutter team",
                "experience": 10,
            
               
               
            });
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Add Challanges without token", async () => {
        const response = await chai.request(app).post(constants.challangeApi.addchallangeurl)
            .send({
                "title": "Challange Added on 11 May 2022",
                "description": "Challange Added for flutter team",
                "experience": 10,
                "habits": [{
                    "title": "Habits for flutter",
                    "description": "Desc 1dfadsvdd",
                    "habitType": true,
                    "tags": ["School"]
                }],
                "todos": [{
                    "title": "Buy Groceries",
                    "description": "From Dilip Kirana Store We have to Buy this",
                    "dueDate": "2022-04-20",
                    "tags": ["Groceries", "Home"],
                    "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
                }],
                "dailies": [{
                    "title": "Exercise",
                    "description": "Pushups For 10 minutes",
                    "startDate": "2022-04-20",
                    "days": [true, false, false, false, true, true, true],
                    "tags": ["Groceries", "Home"],
                    "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
                }]
            });
        expect(response.status).to.be.eq(constants.unauthorise);
    });
    it("Add Challanges with invalid token", async () => {
        const response = await chai.request(app).post(constants.challangeApi.addchallangeurl)
            .set("authtoken", constants.invalidtoken)
            .send({
                "title": "Challange Added on 11 May 2022",
                "description": "Challange Added for flutter team",
                "experience": 10,
                "habits": [{
                    "title": "Habits for flutter",
                    "description": "Desc 1dfadsvdd",
                    "habitType": true,
                    "tags": ["School"]
                }],
                "todos": [{
                    "title": "Buy Groceries",
                    "description": "From Dilip Kirana Store We have to Buy this",
                    "dueDate": "2022-04-20",
                    "tags": ["Groceries", "Home"],
                    "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
                }],
                "dailies": [{
                    "title": "Exercise",
                    "description": "Pushups For 10 minutes",
                    "startDate": "2022-04-20",
                    "days": [true, false, false, false, true, true, true],
                    "tags": ["Groceries", "Home"],
                    "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
                }]
            });
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Add Challanges without title", async () => {
        const response = await chai.request(app).post(constants.challangeApi.addchallangeurl)
            .set("authtoken", constants.token)
            .send({
                "description": "Challange Added for flutter team",
                "experience": 10,
                "habits": [{
                    "title": "Habits for flutter",
                    "description": "Desc 1dfadsvdd",
                    "habitType": true,
                    "tags": ["School"]
                }],
                "todos": [{
                    "title": "Buy Groceries",
                    "description": "From Dilip Kirana Store We have to Buy this",
                    "dueDate": "2022-04-20",
                    "tags": ["Groceries", "Home"],
                    "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
                }],
                "dailies": [{
                    "title": "Exercise",
                    "description": "Pushups For 10 minutes",
                    "startDate": "2022-04-20",
                    "days": [true, false, false, false, true, true, true],
                    "tags": ["Groceries", "Home"],
                    "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
                }]
            });
        expect(response.status).to.be.eq(constants.validationFail);
    });
    it("Add Challanges without Description", async () => {
        const response = await chai.request(app).post(constants.challangeApi.addchallangeurl)
            .set("authtoken", constants.token)
            .send({
                "title": "Challange Added on 11 May 2022",
                "experience": 10,
                "habits": [{
                    "title": "Habits for flutter",
                    "description": "Desc 1dfadsvdd",
                    "habitType": true,
                    "tags": ["School"]
                }],
                "todos": [{
                    "title": "Buy Groceries",
                    "description": "From Dilip Kirana Store We have to Buy this",
                    "dueDate": "2022-04-20",
                    "tags": ["Groceries", "Home"],
                    "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
                }],
                "dailies": [{
                    "title": "Exercise",
                    "description": "Pushups For 10 minutes",
                    "startDate": "2022-04-20",
                    "days": [true, false, false, false, true, true, true],
                    "tags": ["Groceries", "Home"],
                    "checklists": ["Rice", "Pulse", "Chocolates", "Sugar"]
                }]
            });
        expect(response.status).to.be.eq(constants.validationFail);
    });
});