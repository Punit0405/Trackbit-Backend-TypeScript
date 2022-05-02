import { Schema,Types ,model} from 'mongoose';
import DailyInterface from '../interfaces/DailyInterface';


const dailySchema = new Schema<DailyInterface>({
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
    difficulty:{
        type:[Boolean],
        required:true,
        default:[true,false,false]
        
    },
    checklists:{
        type:[String]
    },
    startDate:{
        type:Date,
        required:true,
        
    },
    days:{
        type:String,
        default:'EveryDay'


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

const Daily = model<DailyInterface>("Daily",dailySchema);

export default Daily;