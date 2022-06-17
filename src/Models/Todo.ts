import { Schema ,model} from "mongoose";
import TodoInterface from "../interfaces/TodoInterface";


const todoSchema = new Schema<TodoInterface>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    challagneId:{
        type:Schema.Types.ObjectId,
        ref:"Challange"
    },
    completedParticipants:{
        type:[Schema.Types.ObjectId],
        ref:"User"
    },
    type:{
        type:Boolean,
        required:true
    },
    checklists:{
        type:[
            {
                checklist:{
                    type:String,
                },
                checkedParticipants:{
                    type:[Schema.Types.ObjectId]
                },
                checked:{
                    type:Boolean
                }
        
            }]
    },
    dueDate:{
        type:Date,
        required:true,
        
    },
    reminderDate:{
        type:Date,
                
    },
    difficulty:{
        type:[Boolean],
        required:true,
        default:[true,false,false]
        
    },
    tags:{
        type:[String]
    },
    reminderTime:{
        type:String,

    }
},{timestamps:true});

const Todo = model<TodoInterface>("Todo",todoSchema);

export default Todo;