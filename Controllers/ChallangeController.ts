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
import HabitController from "./HabitController";
import mongoose from "mongoose";
import parameterValidator from "../Validations/parameterValidator";

const habitController = new HabitController();
class ChallangeClass {
  public addChallange = async (req: RequestUser, res: Response) => {
    try {
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
          let newHabit = new Habit({
            title: habit.title,
            description: habit.description,
            habitType: habit.habitType,
            duration: habit.duration,
            tags: habit.tags,
            challagneId: newchallange._id,
            reminder: habit.reminder,
          });
          newchallange.habits.push(newHabit._id);
          await newHabit.save();
        });
      }

      if (todos && (todos as Array<TodoInterface>).length !== 0) {
        todos.forEach(async (todo: TodoInterface) => {
          let newTodo = new Todo({
            title: todo.title,
            description: todo.description,
            checklists: todo.checklists,
            dueDate: todo.dueDate,
            challagneId: newchallange._id,
            tags: todo.tags,
            reminder: todo.reminder,
          });
          newchallange.todos.push(newTodo._id);
          await newTodo.save();
        });
      }

      if (dailies && (dailies as Array<DailyInterface>).length !== 0) {
        dailies.forEach(async (daily: DailyInterface) => {
          let newDaily = new Daily({
            title: daily.title,
            description: daily.description,
            checklists: daily.checklists,
            startDate: daily.startDate,
            challagneId: newchallange._id,
            days: daily.days,
            tags: daily.tags,
            reminder: daily.reminder,
          });
          newchallange.dailies.push(newDaily._id);
          await newDaily.save();
        });
      }
      await newchallange.save();

      return res
        .status(200)
        .json({ status: true, data: "Challange Added Succesfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, data: "Some Internal Error Occured" });
    }
  };
  public fetchChallanges = async (req: RequestUser, res: Response) => {
    try {
      const challanges = await Challange.find({ userId: req.user.id })
        .populate({ path: "habits" })
        .populate({ path: "todos" })
        .populate({ path: "dailies" });
      if (challanges.length === 0) {
        return res
          .status(404)
          .json({ status: true, data: "You Dont Have Any Challanges Yet" });
      }
      return res.status(200).json({ status: true, data: challanges });
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, data: "Some Internal Error Occured" });
    }
  };
  public joinChallange = async (req: RequestUser, res: Response) => {
    try {
      const challangeId = req.params.challangeId;
      if (!challangeId) {
        return res
          .status(400)
          .json({ status: false, data: "Please Provide Challange" });
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
      loggedinUser.appliedChallanges.push(challange._id);
      res.status(200).json({
        status: true,
        data: "Congratulations ! You Have Joined Challange",
      });
      challange.participants.push(req.user.id);
      await challange.save();
      return await loggedinUser.save();
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, data: "Some Internal Error Occured" });
    }
  };
  public leaveChallange = async (req: RequestUser, res: Response) => {
    try {
      const challageId = req.params.challangeId;
      let challange = await Challange.findById(challageId);
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
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, data: "Some Internal Server Error Occured" });
    }
  };
  public updateChallange = async (req: RequestUser, res: Response) => {
    try {
      let { id } = req.params;
      id = id.trim();
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
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, data: "Some Internal Server Occured" });
    }
  };
  public updateChallangeHabit = async (req: RequestUser, res: Response) => {
    try {
      let { id } = req.params;
      let { challageId } = req.body;
      id=id.trim();
      challageId=challageId.trim()
      if (!challageId) {
        return res
          .status(404)
          .json({ status: false, data: "Please Provide Challange Id" });
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
      if(!challange.habits.includes(id as unknown as mongoose.Types.ObjectId)){
        return res.status(404).json({status:false,data:"Habit not found for this challange"})
      }

      try {
       
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
      } catch (error) {
        return res
          .status(500)
          .json({ status: false, data: "Some Internal Server Occured" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, data: "Some Internal Error Occured" });
    }
  };
  public updateChallangeTodo = async(req:RequestUser,res:Response)=>{
    try {
      let { id } = req.params;
      let { challageId } = req.body;
      id=id.trim();
      challageId=challageId.trim()
      if (!challageId) {
        return res
          .status(404)
          .json({ status: false, data: "Please Provide Challange Id" });
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
      if(!challange.todos.includes(id as unknown as mongoose.Types.ObjectId)){
        return res.status(404).json({status:false,data:"Todo not found for this challange"})
      }

      try {
       
        const { title, description, checklists, dueDate, tags, reminder } =
          req.body;
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
        if (tags) {
          todo.tags = tags;
        }
        if (reminder) {
          todo.reminder = reminder;
        }
        await todo.save();
        return res.status(200).json({ status: true, data: todo });
      } catch (error) {
        return res
          .status(500)
          .json({ status: false, data: "Some Internal Server Occured" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, data: "Some Internal Error Occured" });
    }

  };
  public updateChallangeDaily =async(req:RequestUser,res:Response)=>{
    try {
      let { id } = req.params;
      let { challageId } = req.body;
      id=id.trim();
      challageId=challageId.trim()
      if (!challageId) {
        return res
          .status(404)
          .json({ status: false, data: "Please Provide Challange Id" });
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
      if(!challange.dailies.includes(id as unknown as mongoose.Types.ObjectId)){
        return res.status(404).json({status:false,data:"Daily not found for this challange"})
      }

      try {
       
        const { title, description, checklists, startDate, days, tags, reminder } =
          req.body;
        const daily = await Daily.findById(id);
        if (!daily) {
          return res
            .status(404)
            .json({ status: false, data: "Daily not found" });
        }
        

        if(title){
            daily.title =  title;
        }
        if(description){
            daily.description=description;
        }
        if(checklists){
            daily.checklists=checklists
        }
        if(startDate){
            daily.startDate=startDate
        }
        if(days){
            daily.days=days
        }
        if(tags){
            daily.tags=tags

        }
        if(reminder){
            daily.reminder=reminder
        }
        await daily.save();
        return res.status(200).json({ status: true, data: daily });
      } catch (error) {
        return res
          .status(500)
          .json({ status: false, data: "Some Internal Server Occured" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, data: "Some Internal Error Occured" });
    }

  };
  public showParticipants =async (req:RequestUser,res:Response) => {
    try {
       let {challangeId} = req.params;
       challangeId=challangeId.trim();
       if(!parameterValidator(challangeId)){
          return res.status(400).json({status:false,data:"Please Enter a valid challange id"})
       }
       const challange = await Challange.findById(challangeId).populate({path:"participants",model:"User",select:['email','_id','name']});
       if(!challange){
         return res.status(404).json({status:false,data:'Challange not found'});

       }
       if (challange.userId.toString() !== req.user.id.toString()) {
        return res
          .status(401)
          .json({ status: false, data: "You doesn't own this challange" });
      }
       return res.status(200).json({status:true,data:challange.participants})
      
    } catch (error) {
      return res.status(500).json({status:false,data:'Some Internal Error Occured'})
      
    }
    
  };
  public fetchChallangeForall = async(req:RequestUser,res:Response)=>{
    try {
      const challanges = await Challange.find()
        .populate({ path: "habits" })
        .populate({ path: "todos" })
        .populate({ path: "dailies" });
      if (challanges.length === 0) {
        return res
          .status(404)
          .json({ status: true, data: "No Challange Posted yet" });
      }
      return res.status(200).json({status:true,data:challanges})
      
    } catch (error) {
      return res.status(500).json({status:false,data:"Some Internal Error Occured"})
    }
    
  };
  public deleteChallange = async(req:RequestUser,res:Response)=>{
    try {
      let {challangeId} = req.params;
      challangeId=challangeId.trim();
      if(!parameterValidator(challangeId)){
         return res.status(400).json({status:false,data:"Please Enter a valid challange id"})
      }
      const challange = await Challange.findById(challangeId).populate({path:"participants",model:"User",select:['email','_id','name']});
      if(!challange){
        return res.status(404).json({status:false,data:'Challange not found'});

      }
      if (challange.userId.toString() !== req.user.id.toString()) {
       return res
         .status(401)
         .json({ status: false, data: "You doesn't own this challange" });
     }
       await User.findByIdAndUpdate(req.user.id, {
         $pull: { appliedChallanges: challangeId },
       });
       challange.habits.forEach(async(habit)=>{
           await Habit.findByIdAndDelete(habit)
       });
       challange.todos.forEach(async(todo)=>{
         await Todo.findByIdAndDelete(todo);
       });
       challange.dailies.forEach(async(daily)=>{
         await Daily.findByIdAndDelete(daily);
       });

       challange.delete();
       return res.status(200).json({status:true,data:"Challange Deleted Successfully"})

      //  await Challange.findByIdAndDelete(challangeId);

      
     
   } catch (error) {
     return res.status(500).json({status:false,data:'Some Internal Error Occured'})
     
   }
      
  }
}
export default ChallangeClass;
