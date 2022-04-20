import express, { Request, Response } from "express";
import DailyClass from "../Controllers/DailyController";
import isLoggedin from "../Middlewares/isLoggedin";
import DailyValidator from "../Validations/dailyValidator";

const DailyController = new DailyClass();
const validator = new DailyValidator();

class DailyRouter {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  private routes() {
    //Route for Adding Habbit
    this.router
      .route("/adddaily")
      .post(isLoggedin, validator.validateDaily, DailyController.addDaily);

    //Route for Fetching daily
    this.router.route("/fetchdaily").get(isLoggedin, DailyController.fetchDailys);

    //Route for Updating daily
    this.router
      .route("/updatedaily/:id")
      .put(isLoggedin, validator.validateDaily, DailyController.updateDaily);

    //Route for Deleting daily
    this.router
      .route("/deletedaily/:id")
      .delete(isLoggedin, DailyController.deleteDaily);
  }
}
export default DailyRouter;
