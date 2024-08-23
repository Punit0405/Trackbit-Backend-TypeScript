import { Schema ,model} from "mongoose";
import ChallangeInterface from "../interfaces/ChallangeInterface";


const challangeSchema = new Schema<ChallangeInterface>({
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
    dailies:{
        type:[Schema.Types.ObjectId],
        ref:"Daily"
    },
    todos:{
        type:[Schema.Types.ObjectId],
        ref:"Todo"
    },
    habits:{
        type:[Schema.Types.ObjectId],
        ref:"Habit"
    },
    participants:{
        type:[Schema.Types.ObjectId],
        ref:"User"
    },
    experience:{
        type:Number,
        required:true
    }
},{timestamps:true});

const Challange = model<ChallangeInterface>("Challange",challangeSchema);

export default Challange;