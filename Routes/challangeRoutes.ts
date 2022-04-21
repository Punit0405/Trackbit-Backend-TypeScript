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
    //Route for fetching Challange
    this.router.route("/fetchchallange").get(isLoggedin, ChallangeController.fetchChallanges);
    //Route for joining Challange
    this.router.route("/joinChallange/:challangeId").get(isLoggedin, ChallangeController.joinChallange);
    this.router.route("/leaveChallange/:challangeId").get(isLoggedin, ChallangeController.leaveChallange);
    
  

  }
}
export default ChallangeRouter;
