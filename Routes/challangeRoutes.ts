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
            .post(
                isLoggedin,
                validator.validateChallange,
                ChallangeController.addChallange
            );
        //Route for fetching Challange
        this.router
            .route("/fetchchallange")
            .get(isLoggedin, ChallangeController.fetchChallanges);
        //Route for joining Challange
        this.router
            .route("/joinChallange/:challangeId")
            .get(isLoggedin, ChallangeController.joinChallange);
        this.router
            .route("/leaveChallange/:challangeId")
            .get(isLoggedin, ChallangeController.leaveChallange);

        //Route For Updateing Challange
        this.router
            .route("/updatechallange/:id")
            .put(
                isLoggedin,
                validator.validateChallange,
                ChallangeController.updateChallange
            );
        //Route For Updating Challange Habit
        this.router
            .route("/updatechallangehabit/:id")
            .put(isLoggedin, ChallangeController.updateChallangeHabit);
        //Route For Updating Challange Todo

        this.router
            .route("/updatechallangetodo/:id")
            .put(isLoggedin, ChallangeController.updateChallangeTodo);

        //Route For Updating Challange Daily
        this.router
            .route("/updatechallangedaily/:id")
            .put(isLoggedin, ChallangeController.updateChallangeDaily);

        this.router
            .route("/showparticipants/:challangeId")
            .get(isLoggedin, ChallangeController.showParticipants);

        this.router.route("/fetchallchallanges").get(isLoggedin,ChallangeController.fetchChallangeForall);
        this.router.route("/deletechallange/:challangeId").delete(isLoggedin,ChallangeController.deleteChallange);
    }
}
export default ChallangeRouter;
