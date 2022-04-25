import Todo from '../Models/Todo';
import {Response} from 'express';
import User from '../Models/User';
import TodoInterface from '../interfaces/TodoInterface';
import RequestUser from '../Middlewares/RequestInterface';
import parameterValidator from '../Validations/parameterValidator';
class TodoClass{
    public addTodo =async(req:RequestUser,res:Response)=>{    
        try {
            
            const {title,description,checklists,dueDate,tags,reminder} = req.body;
            const newTodo=new Todo({
                title:title,
                description:description,
                checkLists:checklists,
                userId:req.user.id,
                dueDate:dueDate,
                tags:tags
                
                
    
            })
            res.status(200).json({status:200,data:"Todo Added Sucessfully"})
            return await newTodo.save()
            
            
            
        } catch (error) {
            return res.status(500).json({status:false,data:"Some Internal Error Occured"})
        }
        
    
    }
    public fetchTodos =async (req:RequestUser,res:Response)=>{
        try {
            let todos = await Todo.find({userId:req.user.id}).select("-userId");
            
            let challangeTodos:any[]=[];
            const loggedinUser = await User.findById(req.user.id)
            .populate({
                path:'appliedChallanges',
                populate:[{
                path:'habits',model:'Habit'
            },{path:'todos',model:'Todo'},{path:'dailies',model:'Daily'}]});
            if(!loggedinUser){
                return res.status(401).json({status:false,data:"Loggedin User Not exists"})
            }
            loggedinUser.appliedChallanges.map((challange:any)=>{
              challange.todos.map((todo:TodoInterface)=>{
                challangeTodos.push(todo)
              })
                      
            });
            
            todos=todos.concat(challangeTodos);

        
            
            return res.status(200).json({status:true,data:todos})
    
            
        } catch (error) {
            
            return res.status(500).json({status:false,data:"Some Internal Server Occured"})
        }
    
    }
    public updateTodo = async(req:RequestUser,res:Response)=>{
        try {
               const {id}= req.params;
               if(!id){

                return res.status(404).json({status:false,data:"Please provide habit id"})
              }
              if (!parameterValidator(id)) {
                return res
                  .status(400)
                  .json({ status: false, data: "Please Enter a valid habit id" });
              }
               const {title,description,checklists,dueDate,tags,reminder} = req.body;
               const todo = await Todo.findById(id);
               if(!todo){
                   return res.status(404).json({status:false,data:"Todo not found"})
               }
               
               if(todo.userId.toString()!==req.user.id){
    
                 return res.status(400).json({status:false,data:"Todo doesn't Exists for this Account"})
               }
             
    
               if(title){
                   todo.title =  title;
               }
               if(description){
                   todo.description=description;
               }
               if(checklists){
                   todo.checklists=checklists
               }
               if(dueDate){
                   todo.dueDate=dueDate
               }
               if(tags){
                   todo.tags=tags
    
               }
               if(reminder){
                   todo.reminder=reminder
               }
               await todo.save();
               return res.status(200).json({status:true,data:todo})
    
               
           } catch (error) {
            
               return res.status(500).json({status:false,data:"Some Internal Server Occured"})
           }
    }
    public deleteTodo = async(req:RequestUser,res:Response)=>{
        try {
            const {id}=req.params;
            if(!id){

                return res.status(404).json({status:false,data:"Please provide habit id"})
              }
              if (!parameterValidator(id)) {
                return res
                  .status(400)
                  .json({ status: false, data: "Please Enter a valid habit id" });
              }
            const todo= await Todo.findById(id);
            if(!todo){
                return res.status(404).json({status:false,data:"Todo Not Found"})
            }
            if(todo.userId.toString()!==req.user.id){
                return res.status(400).json({status:false,data:"Todo Doesn't Exists For this Account"})
            }
            await Todo.findByIdAndDelete(id)
            return res.status(200).json({status:true,data:todo});
            
        } catch (error) {
  
            return res.status(500).json({status:false,data:"Some Internal Error Occured"})
        }
    }


}
export default TodoClass