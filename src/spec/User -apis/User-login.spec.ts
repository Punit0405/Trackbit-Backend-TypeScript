import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants.spec";

chai.should();
chai.use(chaiHttp);

describe("User-Login", () => {
    it("User Login with Valid Credentials", async () => {
        const response = await chai.request(app)
            .post(constants.userApi.userLoginurl)
            .send({
                "userEmail": "punit.tewani.sa@gmail.com",
                "userPassword": "Punit@92655"
            });
        expect(response).to.have.status(constants.successCode);
    });
    it("User Login without Email ", async () => {
        const response = await chai.request(app)
            .post(constants.userApi.userLoginurl)
            .send({
                "userPassword": "Punit@92655"
            });
        expect(response).to.have.status(constants.requestFail);
    });
    it("User Login without Password ", async () => {
        const response = await chai.request(app)
            .post(constants.userApi.userLoginurl)
            .send({
                "userPassword": "Punit@92655"
            });
        expect(response).to.have.status(constants.requestFail);
    });
    it("User Login with Invalid Credentials", async () => {
        const response = await chai.request(app)
            .post(constants.userApi.userLoginurl)
            .send({
                "userEmail": "punit.tewani.sa@gmail.com",
                "userPassword": "punit@92655"
            });
        expect(response).to.have.status(400);
    });
    it("Check output is in JSON", async () => {
        const response = await chai.request(app)
            .post(constants.userApi.userLoginurl)
            .send({
                "userEmail": "punit.tewani.sa@gmail.com",
                "userPassword": "punit@92655"
            });
        expect(response.body).to.be.a("object");
    });
    it("Check status in response", async () => {
        const response = await chai.request(app)
            .post("/api/v1/user/userlogin")
            .send({
                "userEmail": "punit.tewani.sa@gmail.com",
                "userPassword": "punit@92655"
            });
        expect(response.body).to.have.property("status");
    });
    it("Check data in response", async () => {
        const response = await chai.request(app)
            .post(constants.userApi.userLoginurl)
            .send({
                "userEmail": "punit.tewani.sa@gmail.com",
                "userPassword": "punit@92655"
            });
        expect(response.body).to.have.property("data");
    });
});