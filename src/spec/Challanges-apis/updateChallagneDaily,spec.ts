import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Update Challange Daily ", async () => {
  it("Update challage Daily  Successfully", async () => {
    const response = await chai
      .request(app)
      .put(
        constants.challangeApi.updateChallangeDailyUrl +
          constants.challangeApi.updateChallangeDailyId
      )
      .set("authtoken", constants.token)
      .send({   
        "challageId":"62a82a672e2b0895c7486f85",
        "title":"Vagdhdgnhgnttt",
        "description":"Description for this challange daily",
        "tags":["Drinkning","Health","Hello"],
        "reminder": "2022-10-10 14:50:00"
    });
    expect(response.status).to.be.eq(constants.successCode);
  }); 
  
});