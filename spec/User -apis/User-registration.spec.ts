import App from "../../app";
const app= new App().app;
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.should();
chai.use(chaiHttp);

describe('User-Registraion' ,()=>{
      it("User Register with All parameters" , async (done)=>{
          console.log("Hello");
          done()
      })
});