import Todo from "../Models/Todo";
import { Response } from "express";
import User from "../Models/User";
import TodoInterface from "../interfaces/TodoInterface";
import RequestUser from "../Middlewares/RequestInterface";
import parameterValidator from "../Validations/parameterValidator";
import Challange from "../Models/Challange";
import NotificationClass from "./NotificationController";

const Notifier = new NotificationClass();
class TodoClass {
    public addTodo = async (req: RequestUser, res: Response) => {


        const { title, description, checklists, difficulty, reminderDate, dueDate, tags, reminderTime } = req.body;
        const newTodo = new Todo({
            title: title,
            description: description,
            userId: req.user.id,
            dueDate: dueDate,
            reminderDate: reminderDate,
            tags: tags,
            type: false,
            reminderTime: reminderTime,
            difficulty: difficulty



        });
        checklists.forEach((checklist: any) => {
            const checklistObject = {
                checklist: checklist,
                checked: false
            };
            newTodo.checklists.push(checklistObject);

        });
        res.status(200).json({ status: true, data: "Todo Added Sucessfully" });
        return await newTodo.save();






    };
    public fetchTodos = async (req: RequestUser, res: Response) => {

        let todos = await Todo.find({ userId: req.user.id }).select("-userId");

        const challangeTodos: any[] = [];
        const loggedinUser = await User.findById(req.user.id)
            .populate({
                path: "appliedChallanges",
                populate: [{
                    path: "habits", model: "Habit", select: "-challagneId"
                }, { path: "todos", select: "-challagneId", model: "Todo" }, { path: "dailies", select: "-challagneId", model: "Daily" }]
            });
        if (!loggedinUser) {
            return res.status(401).json({ status: false, data: "Loggedin User Not exists" });
        }
        loggedinUser.appliedChallanges.map((challange: any) => {
            challange.todos.map((todo: TodoInterface) => {
                if (!todo.completedParticipants.includes(req.user.id)) {

                    challangeTodos.push(todo);
                }
            });

        });

        todos = todos.concat(challangeTodos);
        todos.forEach((todo: any) => {
            if (todo.type) {
                todo.checklists.forEach((checklist: any) => {
                    if (checklist.checkedParticipants.includes(req.user.id)) {
                        checklist.checked = true;

                    } else {
                        checklist.checked = false;
                    }

                });
            }
        });



        return res.status(200).json({ status: true, data: todos });




    };
    public updateTodo = async (req: RequestUser, res: Response) => {

        const { id } = req.params;
        if (!id) {http://localhost:5000

            return res.status(404).json({ status: false, data: "Please provide habit id" });
        }
        if (!parameterValidator(id)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid habit id" });
        }
        const { title, description, difficulty, reminderDate, checklists, dueDate, tags, reminderTime } = req.body;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ status: false, data: "Todo not found" });
        }

        if (todo.userId.toString() !== req.user.id) {

            return res.status(400).json({ status: false, data: "Todo doesn't Exists for this Account" });
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
            todo.reminderDate = reminderDate;
        }
        if (difficulty) {
            todo.difficulty = difficulty;
        }
        if (tags) {
            todo.tags = tags;

        }
        if (reminderTime) {
            todo.reminderTime = reminderTime;
        }
        await todo.save();
        return res.status(200).json({ status: true, data: todo });


    };
    public deleteTodo = async (req: RequestUser, res: Response) => {

        const { id } = req.params;
        if (!id) {

            return res.status(404).json({ status: false, data: "Please provide habit id" });
        }
        if (!parameterValidator(id)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid habit id" });
        }
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ status: false, data: "Todo Not Found" });
        }
        if (todo.type) {
            return res.status(400).json({ status: false, data: "You cannot delete challange habit" });
        }
        if (todo.userId.toString() !== req.user.id) {
            return res.status(400).json({ status: false, data: "Todo Doesn't Exists For this Account" });
        }
        await Todo.findByIdAndDelete(id);
        return res.status(200).json({ status: true, data: todo });

    };
    public completeTodo = async (req: RequestUser, res: Response) => {

        let todoId = req.params.todoId;
        todoId = todoId.trim();
        if (!parameterValidator(todoId)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid todo id" });
        }
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ status: false, data: "Todo not found" });
        }
        if (!todo.type) {
            if (todo.userId.toString() === req.user.id) {
                await Todo.findByIdAndDelete(todoId);
                return res
                    .status(200)
                    .json({ status: true, data: "Todo completed successfully" });
            } else {
                return res
                    .status(401)
                    .json({ status: false, data: "You don't own this todo." });
            }
        }
        const challange = await Challange.findById(todo.challangeId);
        if (!challange?.participants.includes(req.user.id)) {
            return res
                .status(401)
                .json({ status: false, data: "You are not in this challange" });
        }
        await Todo.findByIdAndUpdate(todoId, {
            $push: { completedParticipants: req.user.id },
        });
        return res
            .status(200)
            .json({ status: true, data: "Todo Completed Marked" });

    };

    public checkTodoCheckList = async (req: RequestUser, res: Response) => {
        let { todoid } = req.params;
        todoid = todoid.trim();
        let { checklistid } = req.body;
        checklistid = checklistid.trim();

        if (!todoid) {
            return res.status(400).json({ status: false, data: "Please Provide Todo Id" });
        }
        if (!parameterValidator(todoid)) {
            return res.status(400).json({ status: false, data: "Please Provide valid todo Id" });
        }
        const todo = await Todo.findById(todoid);
        if (!todo) {
            return res.status(400).json({ status: false, data: "Todo not found" });
        }
        if (!todo.type) {
            if (todo.userId.toString() === req.user.id) {
                todo.checklists.forEach((checklist: any) => {
                    if (checklist._id.toString() === checklistid) {
                        checklist.checked = true;
                    }
                });
       
                todo.save();

                return res
                    .status(200)
                    .json({ status: true, data: "Checklist checked successfully" });
            } else {
                return res
                    .status(401)
                    .json({ status: false, data: "You don't own this todo." });
            }
        }
        const challange = await Challange.findById(todo.challangeId);
        if (!challange?.participants.includes(req.user.id)) {
            return res
                .status(401)
                .json({ status: false, data: "You are not in this challange" });
        }
        todo.checklists.forEach((checklist: any) => {
            if (checklist.checkedParticipants.includes(req.user.id)) {
                if (checklist._id.toString() === checklistid) {

                    checklist.checkedParticipants.remove(req.user.id);
                }

            } else {
                if (checklist._id.toString() === checklistid) {

                    checklist.checkedParticipants.push(req.user.id);
                }
            }

        });
        todo.save();

        return res
            .status(200)
            .json({ status: true, data: "Checklist Checked" });
    };
    public todoNotification = async () =>{
        const todos = await Todo.find({type:false}).populate({path:'userId'});
        const challaneTodo = await Todo.find({type:true}).populate({path:"challangeId",populate:{
            path:"participants"
        }});
        
        if(todos.length === 0 && challaneTodo.length === 0){
            return 0;
        }

        const daySortedTodo:any[] = [];
        const notificationTodos:any[] = [];
        const daySortedChallangeDaily:any[]=[];
        const notifiChallangeTodos:any[]=[];
        const fulldate = new Date();
        const date = fulldate.getDate();
        const month = fulldate.getMonth();
        const year = fulldate.getFullYear();
        let todayDateTime:any = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
        const hour = Number(todayDateTime.split(" ")[1].split(":")[0]);
        const minutes = Number(todayDateTime.split(" ")[1].split(":")[1]); 
        todos.forEach((todo:any)=>{
            if(todo.reminderDate.getDate() === date && todo.reminderDate.getMonth() === month && todo.reminderDate.getFullYear() === year){
                daySortedTodo.push(todo);
                
            }

            
        });
        challaneTodo.forEach((todo:any)=>{
            if(todo.reminderDate.getDate() === date && todo.reminderDate.getMonth() === month && todo.reminderDate.getFullYear() === year){
                daySortedChallangeDaily.push(todo);
                
            }

            
        });
        daySortedTodo.forEach((todo:any) => {
            const todoHour = Number(todo.reminder.split(":")[0]);
            const todoMinutes = Number(todo.reminder.split(":")[1]);
      
            if (todoHour === hour && todoMinutes === minutes) {
                notificationTodos.push(todo);
            }
          });
          daySortedChallangeDaily.forEach((todo:any) => {
            const todoHour = Number(todo.reminder.split(":")[0]);
            const todoMinutes = Number(todo.reminder.split(":")[1]);
            if (todoHour === hour && todoMinutes === minutes) {
                notifiChallangeTodos.push(todo);
            }
          });







        notificationTodos.forEach((todo:any) => {
            const registration_ids: string[] = [];
            registration_ids.push(todo.userId.deviceToken);
            Notifier.sendNotification(
              registration_ids,
              todo.userId._id,
              "Reminder For Your Todo Task",
              todo.title
            );
          });
          notifiChallangeTodos.forEach((todo:any) => {
            const registration_ids: string[] = [];
            if (todo.challangeId.participants.length === 0) {
              return 0;
            }
      
            todo.challangeId.participants.forEach((participant: any) => {
              registration_ids.push(participant.deviceToken);
              Notifier.sendNotification(
                registration_ids,
                participant.toString,
                "Reminder For Your challange Todo Task",
                todo.title
              );
            });
          });
        
       


    }

}
export default TodoClass;