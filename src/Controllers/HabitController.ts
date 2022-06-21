import Habit from "../Models/Habit";
import User from "../Models/User";
import { Response } from "express";
import RequestUser from "../Middlewares/RequestInterface";
import HabitInterface from "../interfaces/HabitInterface";
import parameterValidator from "../Validations/parameterValidator";
import NotificationClass from "./NotificationController";
const EventEmitter = require('events');
const event = new EventEmitter()
const Notifier = new NotificationClass();
class HabitClass {
    public addHabit = async (req: RequestUser, res: Response) => {

        const { title, description, habitType, difficulty, duration, tags, reminder } = 
            req.body;
        const newHabit = new Habit({
            title: title,
            description: description,
            habitType: habitType,
            duration: duration,
            difficulty: difficulty,
            tags: tags,
            type: false,
            reminder: reminder,
            userId: req.user.id,
        });
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({status:false,data:"User not found"})
        }
        const time = reminder.split(':') 
        let cronString = `${time[1]} ${time[0]} * * *`;
        const registration_ids :string[] = [];
        if(user.deviceToken){
            registration_ids.push(user.deviceToken);

        }

        res.status(200).json({ status: true, data: "Habit Added Sucessfully" });
        return await newHabit.save();

    };
    public fetchHabitsFunction = async (userId:string)=>{
        let habits = await Habit.find({ userId: userId }).select("-userId");
        const challangeHabits: any[] = [];
        const loggedinUser = await User.findById(userId).populate({
            path: "appliedChallanges",
            populate: [
                {
                    path: "habits",
                    model: "Habit",
                    select: "-challagneId"
                },
                { path: "todos", model: "Todo" },
                { path: "dailies", model: "Daily" },
            ],
        });
        if (!loggedinUser) {
            return "User Not Exists"
        }
        loggedinUser.appliedChallanges.map((challange: any) => {
            challange.habits.map((habit: HabitInterface) => {
                challangeHabits.push(habit);
            });
        });

        habits = habits.concat(challangeHabits);
        return habits;

    };
    public fetchHabits = async (req: RequestUser, res: Response) => {
       const habits = await this.fetchHabitsFunction(req.user.id);         
       console.log(habits);
       

        return res.status(200).json({ status: true, data: habits });

    };
    public updateHabit = async (req: RequestUser, res: Response) => {

        let { id } = req.params;
        id = id.trim();
        if (!id) {
            return res
                .status(404)
                .json({ status: false, data: "Please provide habit id" });
        }
        if (!parameterValidator(id)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid habit id" });
        }

        const { title, description, habitType, difficulty, duration, tags, reminder } =
            req.body;

        const habit = await Habit.findById(id);
        if (!habit) {
            return res.status(404).json({ status: false, data: "Habit not found" });
        }

        if (habit.userId.toString() !== req.user.id) {
            return res
                .status(400)
                .json({
                    status: false,
                    data: "Habit doesn't Exists for this Account",
                });
        }

        if (title) {
            habit.title = title;
        }
        if (description) {
            habit.description = description;
        }
        if (habitType) {
            habit.habitType = habitType;
        }
        if (duration) {
            habit.duration = duration;
        }
        if (difficulty) {
            habit.duration = difficulty;
        }
        if (tags) {
            habit.tags = tags;
        }
        if (reminder) {
            habit.reminder = reminder;
        }
        await habit.save();
        return res.status(200).json({ status: true, data: habit });

    };
    public deleteHabit = async (req: RequestUser, res: Response) => {

        const { id } = req.params;
        if (!id) {

            return res.status(404).json({ status: false, data: "Please provide habit id" });
        }
        if (!parameterValidator(id)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid habit id" });
        }
        const habit = await Habit.findById(id);
        if (!habit) {
            return res.status(404).json({ status: false, data: "Habit Not Found" });
            
        }
        if(habit.type){
            return res.status(400).json({status:false,data:"You cannot delete challange habit"});
        }
        if (habit.userId.toString() !== req.user.id) {
            return res
                .status(400)
                .json({
                    status: false,
                    data: "Habit Doesn't Exists For this Account",
                });
        }
        await Habit.findByIdAndDelete(id);
        return res.status(200).json({ status: true, data: habit });

    };
    public habitNotification = async () =>{
        const habits = await Habit.find({type:false}).populate({path:'User'});
        const notificationHabits:any[] = [];
        habits.forEach((habit)=>{
            const date=new Date();
            const hour = date.getHours();
            const minutes = date.getMinutes();
            const habitHour = Number(habit.reminder.split(":")[0]);
            const habitMinutes = Number(habit.reminder.split(":")[1]);
            if(habitHour === hour && habitMinutes === minutes){
                notificationHabits.push(habit)

            }
        });
        notificationHabits.forEach((habit)=>{

            const registration_ids :string []= []
            registration_ids.push(habit.userId.deviceToken);
            Notifier.sendNotification(registration_ids,"Its Time To Follow Your Habit",habit.userId,habit.title)
            // const hour : number = Number(habit.reminder.split(":")[0]);
            // const minute : number = Number(habit.reminder.split(":")[1]);
            // const cronString = `${minute} ${hour} * * *`;
            // const notificationSender =cron.schedule(cronString,()=>{
            //     event.emit('SENT');
            // });
            // event.on('SENT', () => {
            //     console.log('SENT');
            //     notificationSender.stop();
            // });

            

        })

    }
}
export default HabitClass;
