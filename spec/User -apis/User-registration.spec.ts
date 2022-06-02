import app from "../appfile";
import chai ,{expect} from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("User-Registraion" ,()=>{
    it("User Register with All parameters" , async (done)=>{
        console.log("Hello");
        const response = await chai.request(app).post("/api/v1/user/userregister").send({
            "name":"Punit Tewani",
            "email":"punit.tewani.sa@gmail.com",
            "password":"Punit@92655",
            "confirmpassword":"Punit@92655"
            
        });
        console.log(response);
        response.status.should.be.eq(200);
        done();
    });
});