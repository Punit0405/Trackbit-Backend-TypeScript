import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Add Daily", async () => {
    it("Adding daily with all the parameters with token", async () => {
        const response = await chai
            .request(app)
            .post(constants.dailyApi.adddailyturl)
            .set(
                "authtoken",
                constants.token
            )
            .send({
                "title":"Exercise",
                "description":"Pushups For 10 minutes",
                "startDate":"2022-04-20",
                "days":[true,false,false,false,false,false,true],
                "tags":["Groceries","Home"],
                "difficulty":[false,true,false],
                "checklists":["Rice","Pulse","Chocolates","Sugar"],
                "reminder":"10:05"
            });
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Adding daily with description less than 10  parameters with token", async () => {
        const response = await chai
            .request(app)
            .post(constants.dailyApi.adddailyturl)
            .set(
                "authtoken",
                constants.token
            )
            .send({
                "title":"Exercise",
                "description":"Push",
                "startDate":"2022-04-20",
                "days":[true,false,false,false,false,false,true],
                "tags":["Groceries","Home"],
                "difficulty":[false,true,false],
                "checklists":["Rice","Pulse","Chocolates","Sugar"],
                "reminder":"10:05"
            });
        expect(response.status).to.be.eq(constants.validationFail);
    });
    it("Adding daily with title less than 3 characters all the parameters with token", async () => {
        const response = await chai
            .request(app)
            .post(constants.dailyApi.adddailyturl)
            .set(
                "authtoken",
                constants.token
            )
            .send({
                "title":"Exe",
                "description":"Pushups For 10 minutes",
                "startDate":"2022-04-20",
                "days":[true,false,false,false,false,false,true],
                "tags":["Groceries","Home"],
                "difficulty":[false,true,false],
                "checklists":["Rice","Pulse","Chocolates","Sugar"],
                "reminder":"10:05"
            });
        expect(response.status).to.be.eq(constants.validationFail);
    });
    it("Adding daily with all the parameters with invalidtoken", async () => {
        const response = await chai
            .request(app)
            .post(constants.dailyApi.adddailyturl)
            .set(
                "authtoken",
                constants.invalidtoken
            )
            .send({
                "title":"Exercise",
                "description":"Pushups For 10 minutes",
                "startDate":"2022-04-20",
                "days":[true,false,false,false,false,false,true],
                "tags":["Groceries","Home"],
                "difficulty":[false,true,false],
                "checklists":["Rice","Pulse","Chocolates","Sugar"],
                "reminder":"10:05"
            });
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Adding daily with all the parameters without token", async () => {
        const response = await chai
            .request(app)
            .post(constants.dailyApi.adddailyturl)
            .send({
                "title":"Exercise",
                "description":"Pushups For 10 minutes",
                "startDate":"2022-04-20",
                "days":[true,false,false,false,false,false,true],
                "tags":["Groceries","Home"],
                "difficulty":[false,true,false],
                "checklists":["Rice","Pulse","Chocolates","Sugar"],
                "reminder":"10:05"
            });
        expect(response.status).to.be.eq(constants.unauthorise);
    });
  

});


