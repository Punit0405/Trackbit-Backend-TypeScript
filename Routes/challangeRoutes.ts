import express, { Request, Response } from "express";
import ChallangeClass from "../Controllers/ChallangeController";
import isLoggedin from "../Middlewares/isLoggedin";
import ChallangeValidator from "../Validations/challangeValidator";

const ChallangeController = new ChallangeClass();
const validator = new ChallangeValidator();

class ChallangeRouter {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  private routes() {
    //Route for Adding Habbit
    this.router
      .route("/addchallange")
      .post(isLoggedin, validator.validateChallange, ChallangeController.addChallange);

  }
}
export default ChallangeRouter;
