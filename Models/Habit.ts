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
    challagneId:{
        type:Schema.Types.ObjectId,
        ref:'Challange'
    },
    habitType:{
        type:Boolean,
        required:true
    },
    duration:{
        type:[Boolean],
        required:true,
        default:[true,false,false]
    },
    tags:{
       type:[String]
    },
    reminder:{
        type:String,

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Habit = model<HabitInterface>("Habit",habitSchema);

export default Habit;