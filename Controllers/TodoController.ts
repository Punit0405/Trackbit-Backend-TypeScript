import Todo from "../Models/Todo";
import {Response} from "express";
import User from "../Models/User";
import TodoInterface from "../interfaces/TodoInterface";
import RequestUser from "../Middlewares/RequestInterface";
import parameterValidator from "../Validations/parameterValidator";
import Challange from "../Models/Challange";
class TodoClass{
    public addTodo =async(req:RequestUser,res:Response)=>{    
      
            
        const {title,description,checklists,difficulty,reminderDate,dueDate,tags,reminderTime} = req.body;
        console.log(req.body);
        const newTodo=new Todo({
            title:title,
            description:description,
            userId:req.user.id,
            dueDate:dueDate,
            reminderDate:reminderDate,
            tags:tags,
            type:false,
            reminderTime:reminderTime,
            difficulty:difficulty
                
                
    
        });
        checklists.forEach((checklist:any) => {
            const checklistObject = {
                checklist:checklist,
                checked:false
            }
            newTodo.checklists.push(checklistObject)
            
        });
        res.status(200).json({status:true,data:"Todo Added Sucessfully"});
        return await newTodo.save();
            
            
            
     
        
    
    };
    public fetchTodos =async (req:RequestUser,res:Response)=>{
       
        let todos = await Todo.find({userId:req.user.id}).select("-userId");
            
        const challangeTodos:any[]=[];
        const loggedinUser = await User.findById(req.user.id)
            .populate({
                path:"appliedChallanges",
                populate:[{
                    path:"habits",model:"Habit", select:"-challagneId"
                },{path:"todos", select:"-challagneId",model:"Todo"},{path:"dailies",select:"-challagneId",model:"Daily"}]});
        if(!loggedinUser){
            return res.status(401).json({status:false,data:"Loggedin User Not exists"});
        }
        loggedinUser.appliedChallanges.map((challange:any)=>{
            challange.todos.map((todo:TodoInterface)=>{
                if(!todo.completedParticipants.includes(req.user.id)){

                    challangeTodos.push(todo);
                }
            });
                      
        });
            
        todos=todos.concat(challangeTodos);
        todos.forEach((todo:any)=>{
            if(todo.type){
                todo.checklists.forEach((checklist:any)=>{
                    if(checklist.checkedParticipants.includes(req.user.id)){
                        checklist.checked=true;
                        
                    }else{
                        checklist.checked=false;
                    }

                })
            }
        })

        
            
        return res.status(200).json({status:true,data:todos});
    
            
      
    
    };
    public updateTodo = async(req:RequestUser,res:Response)=>{
       
        const {id}= req.params;
        if(!id){

            return res.status(404).json({status:false,data:"Please provide habit id"});
        }
        if (!parameterValidator(id)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid habit id" });
        }
        const {title,description,difficulty,reminderDate,checklists,dueDate,tags,reminderTime} = req.body;
        const todo = await Todo.findById(id);
        if(!todo){
            return res.status(404).json({status:false,data:"Todo not found"});
        }
        
        if(todo.userId.toString()!==req.user.id){
            
            return res.status(400).json({status:false,data:"Todo doesn't Exists for this Account"});
        }
        await Todo.findByIdAndUpdate(id,{$unset:{checklists}})
             
    
        if(title){
            todo.title =  title;
        }
        if(description){
            todo.description=description;
        }
        if(checklists){
            
            checklists.forEach((checklist:any) => {
                const checklistObject = {
                    checklist:checklist,
                    checked:false
                }
                todo.checklists.push(checklistObject)
                
            });
        }
        if(dueDate){
            todo.dueDate=dueDate;
        }
        if(reminderDate){
            todo.reminderDate=reminderDate;
        }
        if(difficulty){
            todo.difficulty=difficulty;
        }
        if(tags){
            todo.tags=tags;
    
        }
        if(reminderTime){
            todo.reminderTime=reminderTime;
        }
        await todo.save();
        return res.status(200).json({status:true,data:todo});
    
          
    };
    public deleteTodo = async(req:RequestUser,res:Response)=>{

        const {id}=req.params;
        if(!id){

            return res.status(404).json({status:false,data:"Please provide habit id"});
        }
        if (!parameterValidator(id)) {
            return res
                .status(400)
                .json({ status: false, data: "Please Enter a valid habit id" });
        }
        const todo= await Todo.findById(id);
        if(!todo){
            return res.status(404).json({status:false,data:"Todo Not Found"});
        }
        if(todo.type){
            return res.status(401).json({status:false,data:"You cannot delete challangetype todo"})
        }
        if(todo.userId.toString()!==req.user.id){
            return res.status(400).json({status:false,data:"Todo Doesn't Exists For this Account"});
        }
        await Todo.findByIdAndDelete(id);
        return res.status(200).json({status:true,data:todo});
            
     
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
        const challange = await Challange.findById(todo.challagneId);
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

    public checkTodoCheckList=async (req: RequestUser, res: Response)=>{
        let {todoid}=req.params;
        todoid = todoid.trim();
        let {checklistid}=req.body;
        checklistid=checklistid.trim();
    
        if(!todoid){
            return res.status(400).json({status:false,data:"Please Provide Todo Id"});
        }
        if(!parameterValidator(todoid)){
            return res.status(400).json({status:false,data:"Please Provide valid todo Id"})
        }
        const todo=await Todo.findById(todoid);
        if(!todo){
            return res.status(400).json({status:false,data:"Todo not found"})
        }
        if (!todo.type) {
            if (todo.userId.toString() === req.user.id) {
                 todo.checklists.forEach((checklist:any)=>{
                     if(checklist._id.toString() === checklistid){
                        if(checklist.checked){

                            checklist.checked=false;
                           }else{
                            checklist.checked=true;
                     };
                    }
                 })
                 console.log(todo);
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
        const challange = await Challange.findById(todo.challagneId);
        if (!challange?.participants.includes(req.user.id)) {
            return res
                .status(401)
                .json({ status: false, data: "You are not in this challange" });
        };
        todo.checklists.forEach((checklist:any)=>{
            if(checklist.checkedParticipants.includes(req.user.id)){
                if(checklist._id.toString()===checklistid){
                 
                    checklist.checkedParticipants.remove(req.user.id);
                }

            }else{
                if(checklist._id.toString()===checklistid){
                 
                    checklist.checkedParticipants.push(req.user.id);
                }
            }
             
        })
        todo.save();
        
        return res
            .status(200)
            .json({ status: true, data: "Checklist Checked" });
    }


}
export default TodoClass;