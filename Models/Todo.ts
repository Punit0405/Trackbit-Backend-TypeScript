import { Schema  ,model} from "mongoose";
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
    checklists:{
        type:[String]
    },
    dueDate:{
        type:Date,
        required:true,
        
    },
    tags:{
        type:[String]
    },
    reminder:{
        type:Date,

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Todo = model<TodoInterface>("Todo",todoSchema);

export default Todo;