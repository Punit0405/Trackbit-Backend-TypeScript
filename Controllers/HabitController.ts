import Habit from '../Models/Habit';
import {Response} from 'express';
import RequestUser from '../Middlewares/RequestInterface';
class HabitClass{
    public addHabit =async(req:RequestUser,res:Response)=>{    
        try {
            
            const {title,description,habitType,duration,tags,reminder} = req.body;
            const newHabit=new Habit({
                title:title,
                description:description,
                habitType:habitType,
                duration:duration,
                tags:tags,
                userId:req.user.id
                
                
    
            })
            res.status(200).json({status:200,data:"Habit Added Sucessfully"})
            return await newHabit.save()
            
            
            
        } catch (error) {
            return res.status(500).json({status:false,data:"Some Internal Error Occured"})
        }
        
    
    }
    public fetchHabits =async (req:RequestUser,res:Response)=>{
        try {
            const habits = await Habit.find({userId:req.user.id}).select("-userId");
            return res.status(200).json({status:true,data:habits})
    
            
        } catch (error) {
            return res.status(500).json({status:false,data:"Some Internal Server Occured"})
        }
    
    }
    public updateHabit = async(req:RequestUser,res:Response)=>{
        try {
               const {id}= req.params;
               const {title,description,habitType,duration,tags,reminder} = req.body;
               const habit = await Habit.findById(id);
               if(!habit){
                   return res.status(404).json({status:false,data:"Habit not found"})
               }
               
               if(habit.userId.toString()!==req.user.id){
    
                 return res.status(400).json({status:false,data:"Habit doesn't Exists for this Account"})
               }
             
    
               if(title){
                   habit.title =  title;
               }
               if(description){
                   habit.description=description;
               }
               if(habitType){
                   habit.habitType=habitType
               }
               if(duration){
                   habit.duration=duration
               }
               if(tags){
                   habit.tags=tags
    
               }
               if(reminder){
                   habit.reminder=reminder
               }
               await habit.save();
               return res.status(200).json({status:true,data:habit})
    
               
           } catch (error) {
            
               return res.status(500).json({status:false,data:"Some Internal Server Occured"})
           }
    }
    public deleteHabit = async(req:RequestUser,res:Response)=>{
        try {
            const {id}=req.params;
            const habit= await Habit.findById(id);
            if(!habit){
                return res.status(404).json({status:false,data:"Habit Not Found"})
            }
            if(habit.userId.toString()!==req.user.id){
                return res.status(400).json({status:false,data:"Habit Doesn't Exists For this Account"})
            }
            await Habit.findByIdAndDelete(id)
            return res.status(200).json({status:true,data:habit});
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({status:false,data:"Some Internal Error Occured"})
        }
    }


}
export default HabitClass