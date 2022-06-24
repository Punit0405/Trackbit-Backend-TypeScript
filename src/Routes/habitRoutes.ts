import express from "express";
import HabitClass from "../Controllers/HabitController";
import isLoggedin from "../Middlewares/isLoggedin";
import HabitValidator from "../Validations/habitValidator";
import cron from 'node-cron';
import DailyClass from "../Controllers/DailyController";
import TodoClass from "../Controllers/TodoController";
import { loggers } from "winston";
import Logger from "../Logger/Logger";
const logger = new Logger().logger
const HabitController = new HabitClass();
const DailyController = new DailyClass();
const TodoController = new TodoClass();
const validator = new HabitValidator();

class HabitRouter {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
        cron.schedule("* * * * *",()=>{
            try{
            HabitController.habitNotification();
            DailyController.dailyNotification();
            TodoController.todoNotification();
            console.log("fetched")
            }
            catch(error){
                logger.error(error)
                
            }
            

        })
    }
    private routes() {
    //Route for Adding Habbit
        this.router
            .route("/addhabit")
            .post(isLoggedin, validator.validateHabit, HabitController.addHabit);

        //Route for Fetching Habit
        this.router
            .route("/fetchhabit")
            .get(isLoggedin, HabitController.fetchHabits);

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
