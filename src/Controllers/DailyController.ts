import Daily from "../Models/Daily";
import { Response } from "express";
import User from "../Models/User";
import DailyInterface from "../interfaces/DailyInterface";
import RequestUser from "../Middlewares/RequestInterface";
import parameterValidator from "../Validations/parameterValidator";
import Challange from "../Models/Challange";
class DailyClass {
    public addDaily = async (req: RequestUser, res: Response) => {
        console.log(req.body);

        const {
            title,
            description,
            checklists,
            startDate,
            days,
            difficulty,
            tags,
            reminder,
        } = req.body;
        const newDaily = new Daily({
            title: title,
            description: description,
            checklists: checklists,
            days: days,
            completed:false,
            type:false,
            userId: req.user.id,
            startDate: startDate,
            tags: tags,
            reminder:reminder,
            difficulty:difficulty
        });
        res.status(200).json({ status: true, data: "Daily Added Sucessfully" });
        return await newDaily.save();
  
    };
    public fetchDailys = async (req: RequestUser, res: Response) => {

        let dailies = await Daily.find({ userId: req.user.id }).select("-userId");
        dailies = dailies.filter((daily)=>{
            if(!daily.completed){
                return daily;
            }
        });

        const challangeDailys: any[] = [];
        const loggedinUser = await User.findById(req.user.id).populate({
            path: "appliedChallanges",
            populate: [
                {
                    path: "habits",
                    select:"-challagneId",
                    model: "Habit",
                },
                { path: "todos",     select:"-challagneId",model: "Todo" },
                { path: "dailies",  select:"-challagneId",model: "Daily" },
            ],
        });
        if (!loggedinUser) {
            return res
                .status(401)
                .json({ status: false, data: "Loggedin User Not exists" });
        }
        loggedinUser.appliedChallanges.map((challange: any) => {
            challange.dailies.map((daily: DailyInterface) => {
                if(!daily.completedParticipants.includes(req.user.id)){

                    challangeDailys.push(daily);
                }
            });
        });

        dailies = dailies.concat(challangeDailys);

        return res.status(200).json({ status: true, data: dailies });
   
    };
    public updateDaily = async (req: RequestUser, res: Response) => {
 
        const { id } = req.params;
        if(!id){

            return res.status(404).json({status:false,data:"Please provide habit id"});
        }
        if (!parameterValidator(id)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid habit id" });
        }
        const {
            title,
            description,
            checklists,
            days,
            startDate,
            tags,
            reminder,
            difficulty
        } = req.body;
        const daily = await Daily.findById(id);
        if (!daily) {
            return res.status(404).json({ status: false, data: "Daily not found" });
        }

        if (daily.userId.toString() !== req.user.id) {
            return res
                .status(400)
                .json({
                    status: false,
                    data: "Daily doesn't Exists for this Account",
                });
        }

        if (title) {
            daily.title = title;
        }
        if (description) {
            daily.description = description;
        }
        if (checklists) {
            daily.checklists = checklists;
        }
        if (startDate) {
            daily.startDate = startDate;
        }
        if (difficulty) {
            daily.difficulty = difficulty;
        }
        if (days) {
            daily.days = days;
        }
        if (tags) {
            daily.tags = tags;
        }
        if (reminder) {
            daily.reminder = reminder;
        }
        await daily.save();
        return res.status(200).json({ status: true, data: daily });

    };
    public deleteDaily = async (req: RequestUser, res: Response) => {
 
        const { id } = req.params;
        if(!id){

            return res.status(404).json({status:false,data:"Please provide habit id"});
        }
        if (!parameterValidator(id)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid habit id" });
        }
        const daily = await Daily.findById(id);
        if (!daily) {
            return res.status(404).json({ status: false, data: "Daily Not Found" });
        }
        if(daily.type){
            return res.status(400).json({status:false,data:"You cannot delete challange Daily"})
        }
        if (daily.userId.toString() !== req.user.id) {
            return res
                .status(400)
                .json({
                    status: false,
                    data: "Daily Doesn't Exists For this Account",
                });
        }
        await Daily.findByIdAndDelete(id);
        return res.status(200).json({ status: true, data: daily });
 
    };

    public completeDaily = async (req: RequestUser, res: Response) => {

        let dailyId = req.params.dailyId;
        dailyId = dailyId.trim();
        if (!parameterValidator(dailyId)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid daily id" });
        }
        const daily = await Daily.findById(dailyId);
        if (!daily) {
            return res.status(404).json({ status: false, data: "Daily not found" });
        }
        if (!daily.type) {
            if (daily.userId.toString() === req.user.id) {
                daily.completed = true;
                await daily.save();
                console.log(daily);
                return res
                    .status(200)
                    .json({ status: true, data: "Daily Completed Successfully" });
            } else {
                return res
                    .status(401)
                    .json({ status: false, data: "You don't own this daily." });
            }
        }
        const challange = await Challange.findById(daily.challagneId);
        if (!challange?.participants.includes(req.user.id)) {
            return res
                .status(401)
                .json({ status: false, data: "You are not in this challange" });
        }
        await Daily.findByIdAndUpdate(dailyId, {
            $push: { completedParticipants: req.user.id },
        });

        setTimeout(myFunction, 1000);
        function myFunction() {
            setTimeout(myFunction, 5000);
        }

        return res
            .status(200)
            .json({ status: true, data: "Daily Completed Marked" });
  
    };
}
export default DailyClass;
