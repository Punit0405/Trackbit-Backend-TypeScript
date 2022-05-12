import { Schema,Types ,model} from 'mongoose';
import TodoInterface from '../interfaces/TodoInterface';


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
        ref:'User'
    },
    challagneId:{
        type:Schema.Types.ObjectId,
        ref:'Challange'
    },
    completedParticipants:{
        type:[Schema.Types.ObjectId],
        ref:'User'
    },
    checklists:{
        type:[String]
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

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Todo = model<TodoInterface>("Todo",todoSchema);

export default Todo;