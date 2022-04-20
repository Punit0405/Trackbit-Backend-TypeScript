import { Schema,Types ,model} from 'mongoose';
import HabitInterface from '../interfaces/HabitInterface';


const habitSchema = new Schema<HabitInterface>({
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
    habitType:{
        type:Boolean,
        required:true
    },
    duration:{
        type:Number,
        required:true,
        default:21
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

const Habit = model<HabitInterface>("Habit",habitSchema);

export default Habit;