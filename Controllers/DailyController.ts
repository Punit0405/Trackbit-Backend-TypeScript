import Daily from '../Models/Daily';
import {Response} from 'express';
import RequestUser from '../Middlewares/RequestInterface';
class DailyClass{
    public addDaily =async(req:RequestUser,res:Response)=>{    
        try {
            
            const {title,description,checklists,startDate,days,tags,reminder} = req.body;
            const newDaily=new Daily({
                title:title,
                description:description,
                checkLists:checklists,
                days:days,
                userId:req.user.id,
                startDate:startDate,
                tags:tags
                
                
    
            })
            res.status(200).json({status:200,data:"Daily Added Sucessfully"})
            return await newDaily.save()
            
            
            
        } catch (error) {
            return res.status(500).json({status:false,data:"Some Internal Error Occured"})
        }
        
    
    }
    public fetchDailys =async (req:RequestUser,res:Response)=>{
        try {
            const dailys = await Daily.find({userId:req.user.id}).select("-userId");
            return res.status(200).json({status:true,data:dailys})
    
            
        } catch (error) {
            return res.status(500).json({status:false,data:"Some Internal Server Occured"})
        }
    
    }
    public updateDaily = async(req:RequestUser,res:Response)=>{
        try {
               const {id}= req.params;
               const {title,description,checklists,days,startDate,tags,reminder} = req.body;
               const daily = await Daily.findById(id);
               if(!daily){
                   return res.status(404).json({status:false,data:"Daily not found"})
               }
               
               if(daily.userId.toString()!==req.user.id){
    
                 return res.status(400).json({status:false,data:"Daily doesn't Exists for this Account"})
               }
             
    
               if(title){
                   daily.title =  title;
               }
               if(description){
                   daily.description=description;
               }
               if(checklists){
                   daily.checkLists=checklists
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
               return res.status(200).json({status:true,data:daily})
    
               
           } catch (error) {
            
               return res.status(500).json({status:false,data:"Some Internal Server Occured"})
           }
    }
    public deleteDaily = async(req:RequestUser,res:Response)=>{
        try {
            const {id}=req.params;
            const daily= await Daily.findById(id);
            if(!daily){
                return res.status(404).json({status:false,data:"Daily Not Found"})
            }
            if(daily.userId.toString()!==req.user.id){
                return res.status(400).json({status:false,data:"Daily Doesn't Exists For this Account"})
            }
            await Daily.findByIdAndDelete(id)
            return res.status(200).json({status:true,data:daily});
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({status:false,data:"Some Internal Error Occured"})
        }
    }


}
export default DailyClass