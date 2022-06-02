import App from "../../app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("User-Login", () => {
    it("User Login with All parameters", async (done) => {
        console.log("Hello");
        done();
    });
});