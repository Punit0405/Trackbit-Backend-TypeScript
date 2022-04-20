import { Schema,Types ,model} from 'mongoose';

interface TodoInterface {
    title:string,
    description:string,
    userId:Types.ObjectId,
    checkLists:[string],
    dueDate:Date
    tags:[string],
    reminder:Date,
    createdAt:Date

    


}
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
    checkLists:{
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