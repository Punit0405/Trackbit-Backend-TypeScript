import Challange from '../Models/Challange';
import Habit from "../Models/Habit";
import Todo from '../Models/Todo';
import Daily  from '../Models/Daily';
import {Response} from 'express';
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
                habits:[]
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
}
export default ChallangeClass;