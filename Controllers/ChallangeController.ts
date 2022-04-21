import Challange from '../Models/Challange';
import Habit from "../Models/Habit";
import User from '../Models/User';
import Todo from '../Models/Todo';
import Daily  from '../Models/Daily';
import {response, Response} from 'express';
import RequestUser from '../Middlewares/RequestInterface';
import HabitInterface from '../interfaces/HabitInterface';
import TodoInterface from '../interfaces/TodoInterface';
import DailyInterface from '../interfaces/DailyInterface';

class ChallangeClass{
    public addChallange =async(req:RequestUser,res:Response)=>{    
        try {       
            const {title,description,habits,todos,dailies,experience} = req.body;
            const newchallange = new Challange({
                title:title,
                description:description,
                experience:experience,
                habits:[],
                userId:req.user.id
            });
            if(habits && (habits as Array<HabitInterface>).length!==0){
                habits.forEach(async(habit:HabitInterface)=>{
                    let newHabit=new Habit({
                        title:habit.title,
                        description:habit.description,
                        habitType:habit.habitType,
                        duration:habit.duration,
                        tags:habit.tags,
                        reminder:habit.reminder
                    })
                    newchallange.habits.push(newHabit._id);
                    await newHabit.save();
                    
                    

                });
            }

            if(todos && (todos as Array<TodoInterface>).length!==0){
                todos.forEach(async(todo:TodoInterface)=>{
                    let newTodo=new Todo({
                        title:todo.title,
                        description:todo.description,
                        checklists:todo.checklists,
                        dueDate:todo.dueDate,
                        tags:todo.tags,
                        reminder:todo.reminder
                    })
                    newchallange.todos.push(newTodo._id);
                    await newTodo.save();

                })
            }

            if(dailies && (dailies as Array<DailyInterface>).length!==0){

                dailies.forEach(async(daily:DailyInterface)=>{
                    let newDaily=new Daily({
                        title:daily.title,
                        description:daily.description,
                        checklists:daily.checklists,
                        startDate:daily.startDate,
                        days:daily.days,
                        tags:daily.tags,
                        reminder:daily.reminder
                    })
                    newchallange.dailies.push(newDaily._id);
                    await newDaily.save();
                    
                })
              
                
            }
              await newchallange.save();
              
            
            return res.status(200).json({status:true,data:"Challange Added Succesfully"})
          
            
            
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({status:false,data:"Some Internal Error Occured"})
        }
        
    
    }
    public fetchChallanges = async(req:RequestUser,res:Response)=>{
        try {
            const challanges=await Challange.find({userId:req.user.id}).populate({path:'habits'}).populate({path:'todos'}).populate({path:'dailies'});
            if(challanges.length===0){
                return res.status(404).json({status:true,data:"You Dont Have Any Challanges Yet"})
            }
            return res.status(200).json({status:true,data:challanges})
            
        } catch (error) {
            return res.status(500).json({status:false,data:"Some Internal Error Occured"})
        }
    }
    public joinChallange =async(req:RequestUser,res:Response)=>{
        try {

            const challangeId= req.params.challangeId;
            if(!challangeId){
                return res.status(400).json({status:false,data:"Please Provide Challange"});

            }
            const challange = await Challange.findById(challangeId);
            if(!challange){
                return res.status(404).json({status:false,data:"Challange Doesn't Exists Anymore"})
            }
            const loggedinUser=await User.findById(req.user.id);
            if(!loggedinUser){
                return res.status(401).json({status:false,data:"Unauthorised User"})
            }
            loggedinUser.appliedChallanges.push(challange._id)
            res.status(200).json({status:true,data:"Congratulations ! You Have Joined Challange"});
            challange.participants.push(req.user.id);
            await challange.save();
            return await loggedinUser.save();
            
            
        } catch (error) {
            return res.status(500).json({status:false,data:"Some Internal Error Occured"})
        }
    }
    public leaveChallange=async(req:RequestUser,res:Response)=>{
        try {
            const challageId=req.params.challangeId;
            let challange= await Challange.findById(challageId);
            if(!challange){
                return res.status(404).json({status:false,data:"Challange Doesn't Exists"})
            }
            if(!challange.participants.includes(req.user.id)){
             return res.status(400).json({status:false,data:"You aren't in this challange"})
            }
           
            await Challange.findByIdAndUpdate(challageId,{$pull:{participants:req.user.id}});
            await User.findByIdAndUpdate(req.user.id,{$pull:{appliedChallanges:challageId}});
            
            
            return res.status(200).json({status:true,data:"Challenge left successfully"});

        } catch (error) {
            return res.status(500).json({status:false,data:"Some Internal Server Error Occured"})
        }
    }
    public updateChallenge=async(req:RequestUser,res:Response)=>{
        
    }
}
export default ChallangeClass;