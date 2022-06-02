import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe.skip("User-Login", () => {
    it("User Login with Invalid Credentials", async () => {
        const response = await chai.request(app)
            .post("/api/v1/user/userlogin")
            .send({
                "userEmail": "punit.tewani.sa@gmail.com",
                "userPassword": "Punit@92655"
            });
        expect(response).to.have.status(200);
    });
    it("User Login with Invalid Credentials", async () => {
        const response = await chai.request(app)
            .post("/api/v1/user/userlogin")
            .send({
                "userEmail": "punit.tewani.sa@gmail.com",
                "userPassword": "Punit@92655"
            });
        expect(response).to.have.status(400);
    });
});