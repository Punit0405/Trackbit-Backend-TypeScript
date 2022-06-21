import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants.spec";

chai.should();
chai.use(chaiHttp);

describe("Update Challange Todo ", async () => {
  it("Update challage Todo  Successfully", async () => {
    const response = await chai
      .request(app)
      .put(
        constants.challangeApi.updateChallangeTodoUrl +
          constants.challangeApi.updateChallangeTodoId
      )
      .set("authtoken", constants.token)
      .send({   
        "challageId":"62a82a672e2b0895c7486f85",
        "title":"Vagdhdgnhgnttt",
        "description":"Description for this challange todo",
        "tags":["Drinkning","Health","Hello"],
        "reminder": "2022-10-10 14:50:00"
    });
    expect(response.status).to.be.eq(constants.successCode);
  }); 
  
});
