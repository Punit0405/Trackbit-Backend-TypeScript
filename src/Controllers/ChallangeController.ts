import mongoose from "mongoose";
import Challange from "../Models/Challange";
import Habit from "../Models/Habit";
import User from "../Models/User";
import Todo from "../Models/Todo";
import Daily from "../Models/Daily";

import { Response } from "express";
import RequestUser from "../Middlewares/RequestInterface";
import HabitInterface from "../interfaces/HabitInterface";
import TodoInterface from "../interfaces/TodoInterface";
import DailyInterface from "../interfaces/DailyInterface";
import parameterValidator from "../Validations/parameterValidator";

class ChallangeClass {
    public addChallange = async (req: RequestUser, res: Response) => {

        const { title, description, habits, todos, dailies, experience } =
            req.body;
        const newchallange = new Challange({
            title: title,
            description: description,
            experience: experience,
            habits: [],
            userId: req.user.id,
        });
        if (habits && (habits as Array<HabitInterface>).length !== 0) {
            habits.forEach(async (habit: HabitInterface) => {
                const newHabit = new Habit({
                    title: habit.title,
                    description: habit.description,
                    habitType: habit.habitType,
                    duration: habit.duration,
                    tags: habit.tags,
                    type: true,
                    challagneId: newchallange._id,
                    reminder: habit.reminder,
                });
                newchallange.habits.push(newHabit._id);
                await newHabit.save();
            });
        }

        if (todos && (todos as Array<TodoInterface>).length !== 0) {
            todos.forEach(async (todo: TodoInterface) => {
                const newTodo = new Todo({
                    title: todo.title,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    type: true,
                    reminderDate: todo.reminderDate,
                    challagneId: newchallange._id,
                    tags: todo.tags,
                    reminderTime: todo.reminderTime,
                });
                todo.checklists.forEach((checklist: any) => {
                    const checklistObject = {
                        checklist: checklist
                    };
                    newTodo.checklists.push(checklistObject);

                });
                newchallange.todos.push(newTodo._id);
                await newTodo.save();
            });
        }

        if (dailies && (dailies as Array<DailyInterface>).length !== 0) {
            dailies.forEach(async (daily: DailyInterface) => {
                const newDaily = new Daily({
                    title: daily.title,
                    description: daily.description,
                    startDate: daily.startDate,
                    challagneId: newchallange._id,
                    days: daily.days,
                    type: true,
                    tags: daily.tags,
                    reminder: daily.reminder,
                });
                daily.checklists.forEach((checklist:any) => {
                    const checklistObject = {
                        checklist:checklist
                    }
                    newDaily.checklists.push(checklistObject)
                    
                });
                newchallange.dailies.push(newDaily._id);
                await newDaily.save();
            });
        }
        await newchallange.save();

        return res
            .status(200)
            .json({ status: true, data: "Challange Added Succesfully" });

    };
    public fetchChallanges = async (req: RequestUser, res: Response) => {

        const challanges = await Challange.find({ userId: req.user.id })
            .populate({ path: "habits" })
            .populate({ path: "todos" })
            .populate({ path: "dailies" })
            .populate({ path: "userId" });
        if (challanges.length === 0) {
            return res
                .status(404)
                .json({ status: true, data: [] });
        }
        return res.status(200).json({ status: true, data: challanges });

    


    };
    public joinChallange = async (req: RequestUser, res: Response) => {

        const challangeId = (req.params.challangeId).trim();
        if (!challangeId) {
            return res
                .status(400)
                .json({ status: false, data: "Please Provide Challange" });
        }
        if (!parameterValidator(challangeId)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid challange id" });
        }
        const challange = await Challange.findById(challangeId);
        if (!challange) {
            return res
                .status(404)
                .json({ status: false, data: "Challange Doesn't Exists Anymore" });
        }
        const loggedinUser = await User.findById(req.user.id);
        if (!loggedinUser) {
            return res
                .status(401)
                .json({ status: false, data: "Unauthorised User" });
        }
        if (
            loggedinUser.appliedChallanges.includes(
                challangeId as unknown as mongoose.Types.ObjectId
            ) &&
            challange.participants.includes(
                req.user.id as unknown as mongoose.Types.ObjectId
            )
        ) {
            return res.status(400).json({
                status: false,
                data: "You are already joined the challange",
            });
        }
        loggedinUser.appliedChallanges.push(challange._id);
        res.status(200).json({
            status: true,
            data: "Congratulations ! You Have Joined Challange",
        });
        challange.participants.push(req.user.id);
        await challange.save();
        return await loggedinUser.save();



    };
    public leaveChallange = async (req: RequestUser, res: Response) => {

        const challageId = req.params.challangeId;
        if (!challageId) {
            return res
                .status(404)
                .json({ status: false, data: "Please provide valid challange id" });
        }
        if (!parameterValidator(challageId)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid challange id" });
        }
        const challange = await Challange.findById(challageId);
        if (!challange) {
            return res
                .status(404)
                .json({ status: false, data: "Challange Doesn't Exists" });
        }
        if (!challange.participants.includes(req.user.id)) {
            return res
                .status(400)
                .json({ status: false, data: "You aren't in this challange" });
        }

        await Challange.findByIdAndUpdate(challageId, {
            $pull: { participants: req.user.id },
        });
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { appliedChallanges: challageId },
        });

        return res
            .status(200)
            .json({ status: true, data: "Challenge left successfully" });



    };
    public updateChallange = async (req: RequestUser, res: Response) => {

        let { id } = req.params;
        id = id.trim();
        if (!id) {
            return res
                .status(404)
                .json({ status: false, data: "Please provide valid challange id" });
        }
        if (!parameterValidator(id)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid challange id" });
        }

        const { title, description } = req.body;
        const challange = await Challange.findById(id);
        if (!challange) {
            return res
                .status(404)
                .json({ status: false, data: "Challange not found" });
        }

        if (challange.userId.toString() !== req.user.id) {
            return res.status(400).json({
                status: false,
                data: "Challange doesn't Exists for this Account",
            });
        }

        if (title) {
            challange.title = title;
        }
        if (description) {
            challange.description = description;
        }

        await challange.save();
        return res.status(200).json({ status: true, data: challange });



    };
    public updateChallangeHabit = async (req: RequestUser, res: Response) => {

        let { id } = req.params;
        let { challageId } = req.body;
        id = id.trim();
        challageId = challageId.trim();
        if (!challageId) {
            return res
                .status(404)
                .json({ status: false, data: "Please Provide Challange Id" });
        }
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

        if (!parameterValidator(challageId)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid challange id" });
        }
        const challange = await Challange.findById(challageId);
        if (!challange) {
            return res
                .status(404)
                .json({ status: false, data: "Challange Doesn't Exists" });
        }
        if (challange.userId.toString() !== req.user.id.toString()) {
            return res
                .status(401)
                .json({ status: false, data: "You doesn't own this challange" });
        }
        if (
            !challange.habits.includes(id as unknown as mongoose.Types.ObjectId)
        ) {
            return res
                .status(404)
                .json({ status: false, data: "Habit not found for this challange" });
        }


        const { title, description, habitType, duration, tags, reminder } =
            req.body;
        const habit = await Habit.findById(id);
        if (!habit) {
            return res
                .status(404)
                .json({ status: false, data: "Habit not found" });
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
        if (tags) {
            habit.tags = tags;
        }
        if (reminder) {
            habit.reminder = reminder;
        }
        await habit.save();
        return res.status(200).json({ status: true, data: habit });




    };

    public deleteChallangeHabit = async (req: RequestUser, res: Response) => {

        let { id } = req.params;
        let { challageId } = req.body;
        id = id.trim();
        challageId = challageId.trim();
        if (!challageId) {
            return res
                .status(404)
                .json({ status: false, data: "Please Provide Challange Id" });
        }
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
        if (!parameterValidator(challageId)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid challange id" });
        }
        const challange = await Challange.findById(challageId);
        if (!challange) {
            return res
                .status(404)
                .json({ status: false, data: "Challange Doesn't Exists" });
        }
        if (challange.userId.toString() !== req.user.id.toString()) {
            return res
                .status(401)
                .json({ status: false, data: "You doesn't own this challange" });
        }
        if (
            !challange.habits.includes(id as unknown as mongoose.Types.ObjectId)
        ) {
            return res
                .status(404)
                .json({ status: false, data: "Habit not found for this challange" });
        }

        try {
            await Challange.findByIdAndUpdate(challageId, {
                $pull: { habits: id },
            });
            await Habit.findByIdAndDelete(id);

            return res
                .status(200)
                .json({ status: true, data: "Habit Deleted Successfully" });
        } catch (error) {
            return res
                .status(500)
                .json({ status: false, data: "Some Internal Server Occured" });
        }

    };

    public updateChallangeTodo = async (req: RequestUser, res: Response) => {

        let { id } = req.params;
        let { challageId } = req.body;
        id = id.trim();
        challageId = challageId.trim();
        if (!challageId) {
            return res
                .status(404)
                .json({ status: false, data: "Please Provide Challange Id" });
        }
        if (!parameterValidator(id)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid todo id" });
        }

        if (!parameterValidator(challageId)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid challange id" });
        }
        const challange = await Challange.findById(challageId);
        if (!challange) {
            return res
                .status(404)
                .json({ status: false, data: "Challange Doesn't Exists" });
        }
        if (challange.userId.toString() !== req.user.id.toString()) {
            return res
                .status(401)
                .json({ status: false, data: "You doesn't own this challange" });
        }
        if (!challange.todos.includes(id as unknown as mongoose.Types.ObjectId)) {
            return res
                .status(404)
                .json({ status: false, data: "Todo not found for this challange" });
        }

        try {
            const {
                title,
                description,
                checklists,
                dueDate,
                reminderDate,
                tags,
                reminderTime,
            } = req.body;
            const todo = await Todo.findById(id);
            if (!todo) {
                return res
                    .status(404)
                    .json({ status: false, data: "Todo not found" });
            }

            if (title) {
                todo.title = title;
            }
            if (description) {
                todo.description = description;
            }
            if (checklists) {
                todo.checklists = checklists;
            }
            if (dueDate) {
                todo.dueDate = dueDate;
            }
            if (reminderDate) {
                todo.dueDate = reminderDate;
            }
            if (tags) {
                todo.tags = tags;
            }
            if (reminderTime) {
                todo.reminderTime = reminderTime;
            }
            await todo.save();
            return res.status(200).json({ status: true, data: todo });
        } catch (error) {
            return res
                .status(500)
                .json({ status: false, data: "Some Internal Server Occured" });
        }



    };
    public deleteChallangeTodo = async (req: RequestUser, res: Response) => {

        let { id } = req.params;
        let { challageId } = req.body;
        id = id.trim();
        challageId = challageId.trim();
        if (!challageId) {
            return res
                .status(404)
                .json({ status: false, data: "Please Provide Challange Id" });
        }
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

        if (!parameterValidator(challageId)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid challange id" });
        }
        const challange = await Challange.findById(challageId);
        if (!challange) {
            return res
                .status(404)
                .json({ status: false, data: "Challange Doesn't Exists" });
        }
        if (challange.userId.toString() !== req.user.id.toString()) {
            return res
                .status(401)
                .json({ status: false, data: "You doesn't own this challange" });
        }
        if (!challange.todos.includes(id as unknown as mongoose.Types.ObjectId)) {
            return res
                .status(404)
                .json({ status: false, data: "Todo not found for this challange" });
        }

        try {
            await Challange.findByIdAndUpdate(challageId, {
                $pull: { todos: id },
            });
            await Todo.findByIdAndDelete(id);

            return res
                .status(200)
                .json({ status: true, data: "Todo Deleted Successfully" });
        } catch (error) {
            return res
                .status(500)
                .json({ status: false, data: "Some Internal Server Occured" });
        }



    };
    public updateChallangeDaily = async (req: RequestUser, res: Response) => {

        let { id } = req.params;
        let { challageId } = req.body;
        id = id.trim();
        challageId = challageId.trim();
        if (!challageId) {
            return res
                .status(404)
                .json({ status: false, data: "Please Provide Challange Id" });
        }
        if (!parameterValidator(id)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid daily id" });
        }

        if (!parameterValidator(challageId)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid challange id" });
        }
        const challange = await Challange.findById(challageId);
        if (!challange) {
            return res
                .status(404)
                .json({ status: false, data: "Challange Doesn't Exists" });
        }
        if (challange.userId.toString() !== req.user.id.toString()) {
            return res
                .status(401)
                .json({ status: false, data: "You doesn't own this challange" });
        }
        if (
            !challange.dailies.includes(id as unknown as mongoose.Types.ObjectId)
        ) {
            return res
                .status(404)
                .json({ status: false, data: "Daily not found for this challange" });
        }

        try {
            const {
                title,
                description,
                checklists,
                startDate,
                days,
                tags,
                reminder,
            } = req.body;
            const daily = await Daily.findById(id);
            if (!daily) {
                return res
                    .status(404)
                    .json({ status: false, data: "Daily not found" });
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
        } catch (error) {
            return res
                .status(500)
                .json({ status: false, data: "Some Internal Server Occured" });
        }


    };

    public deleteChallangeDaily = async (req: RequestUser, res: Response) => {

        let { id } = req.params;
        let { challageId } = req.body;
        id = id.trim();
        challageId = challageId.trim();
        if (!challageId) {
            return res
                .status(404)
                .json({ status: false, data: "Please Provide Challange Id" });
        }
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

        if (!parameterValidator(challageId)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid challange id" });
        }
        const challange = await Challange.findById(challageId);
        if (!challange) {
            return res
                .status(404)
                .json({ status: false, data: "Challange Doesn't Exists" });
        }
        if (challange.userId.toString() !== req.user.id.toString()) {
            return res
                .status(401)
                .json({ status: false, data: "You doesn't own this challange" });
        }
        if (
            !challange.dailies.includes(id as unknown as mongoose.Types.ObjectId)
        ) {
            return res
                .status(404)
                .json({ status: false, data: "Daily not found for this challange" });
        }

        try {
            await Challange.findByIdAndUpdate(challageId, {
                $pull: { dailies: id },
            });
            await Daily.findByIdAndDelete(id);

            return res
                .status(200)
                .json({ status: true, data: "Daily Deleted Successfully" });
        } catch (error) {
            return res
                .status(500)
                .json({ status: false, data: "Some Internal Server Occured" });
        }



    };

    public showParticipants = async (req: RequestUser, res: Response) => {

        let { challangeId } = req.params;
        challangeId = challangeId.trim();
        if (!parameterValidator(challangeId)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid challange id" });
        }
        const challange = await Challange.findById(challangeId).populate({
            path: "participants",
            model: "User",
            select: ["email", "_id", "name"],
        });
        if (!challange) {
            return res
                .status(404)
                .json({ status: false, data: "Challange not found" });
        }
        if (challange.userId.toString() !== req.user.id.toString()) {
            return res
                .status(401)
                .json({ status: false, data: "You doesn't own this challange" });
        }
        return res
            .status(200)
            .json({ status: true, data: challange.participants });



    };
    public fetchChallangeForall = async (req: RequestUser, res: Response) => {

        const challanges = await Challange.find()
            .populate({ path: "userId", select: ["name", "email"], model: "User" })
            .populate({ path: "habits" })
            .populate({ path: "todos" })
            .populate({ path: "dailies" });
        if (challanges.length === 0) {
            return res
                .status(404)
                .json({ status: true, data: [] });
        }
        return res.status(200).json({ status: true, data: challanges });



    };
    public deleteChallange = async (req: RequestUser, res: Response) => {

        let { challangeId } = req.params;
        challangeId = challangeId.trim();
        if (!parameterValidator(challangeId)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid challange id" });
        }
        const challange = await Challange.findById(challangeId).populate({
            path: "participants",
            model: "User",
            select: ["email", "_id", "name"],
        });
        if (!challange) {
            return res
                .status(404)
                .json({ status: false, data: "Challange not found" });
        }
        if (challange.userId.toString() !== req.user.id.toString()) {
            return res
                .status(401)
                .json({ status: false, data: "You doesn't own this challange" });
        }

        challange.participants.forEach(async (participant) => {
            await User.findByIdAndUpdate(participant, {
                $pull: { appliedChallanges: challangeId },
            });
        });
        challange.habits.forEach(async (habit) => {
            await Habit.findByIdAndDelete(habit);
        });
        challange.todos.forEach(async (todo) => {
            await Todo.findByIdAndDelete(todo);
        });
        challange.dailies.forEach(async (daily) => {
            await Daily.findByIdAndDelete(daily);
        });

        challange.delete();
        return res
            .status(200)
            .json({ status: true, data: "Challange Deleted Successfully" });

        //  await Challange.findByIdAndDelete(challangeId);



    };




    public joinedChallange = async (req: RequestUser, res: Response) => {

        const loggedinUser = await User.findById(req.user.id).populate({
            path: "appliedChallanges",
            model: "Challange",
            populate: [{ path: "habits" }, { path: "userId" }, { path: "todos" }, { path: "dailies" }],
        });
        return res
            .status(200)
            .json({ status: true, data: loggedinUser?.appliedChallanges });



    };

    public isChallangeJoined = async (req: RequestUser, res: Response) => {

        let id = req.params.id;
        id = id.trim();
        if (!parameterValidator(id)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid challange id" });
        }
        const challange = await Challange.findById(id);
        if (!challange) {
            return res
                .status(404)
                .json({ status: false, data: "Challange not found" });
        }
        if (challange.participants.includes(req.user.id)) {
            return res.status(200).json({ status: true, data: "Joined" });
        } else {
            return res.status(200).json({ status: true, data: "Not Joined" });
        }


    };

    public emptyArray = async () => {
        Daily.find({}, (err: any, data: any) => {
            if (err) {
                return console.log(err);
            }
            data.forEach((daily: any) => {
                if (!daily.type) {
                    (daily.completed = false); daily.save();
                } else {
                    daily.completedParticipants = [];
                    daily.save();
                }
            });
        });
    };
}
export default ChallangeClass;
