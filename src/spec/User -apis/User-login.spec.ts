import App from "../../app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("User-Login", () => {
    it("User Login with Invalid Credentials", async () => {
        const response = await chai.request(app)
            .post("/api/v1/user/userlogin")
            .send({
                "userEmail": "punit.tewani.sa@gmail.com",
                "userPassword": "Punit@92655"
            });
        expect(response).to.have.status(400);
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