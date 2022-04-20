import express, { Request, Response } from "express";
import HabitClass from "../Controllers/HabitController";
import isLoggedin from "../Middlewares/isLoggedin";
import HabitValidator from "../Validations/habitValidator";

const HabitController = new HabitClass();
const validator = new HabitValidator();

class HabitRouter {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  private routes() {
    //Route for Adding Habbit
    this.router
      .route("/addhabit")
      .post(isLoggedin, validator.validateHabit, HabitController.addHabit);

    //Route for Fetching Habit
    this.router.route("/fetchhabit").get(isLoggedin, HabitController.fetchHabits);

    //Route for Updating Habit
    this.router
      .route("/updateHabit/:id")
      .put(isLoggedin, validator.validateHabit, HabitController.updateHabit);

    //Route for Deleting Habit
    this.router
      .route("/deleteHabit/:id")
      .delete(isLoggedin, HabitController.deleteHabit);
  }
}
export default HabitRouter;
