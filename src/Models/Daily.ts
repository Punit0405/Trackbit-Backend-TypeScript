import { Schema ,model} from "mongoose";
import DailyInterface from "../interfaces/DailyInterface";


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
        ref:"User"
    },
    completedParticipants:{
        type:[Schema.Types.ObjectId],
        ref:"User"
    },
    completed:{
        type:Boolean,
    },
    
    type:{
        type:Boolean,
        required:true
    },
    challagneId:{
        type:Schema.Types.ObjectId,
        ref:"Challange"
    },
    difficulty:{
        type:[Boolean],
        required:true,
        default:[true,false,false]
        
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
    startDate:{
        type:Date,
        required:true,
        
    },
    days:{
        type:[Boolean]


    },
    tags:{
        type:[String]
    },
    reminder:{
        type:String,

    }
},{timestamps:true});

const Daily = model<DailyInterface>("Daily",dailySchema);

export default Daily;