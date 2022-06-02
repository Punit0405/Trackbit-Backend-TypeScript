import { Schema ,model} from "mongoose";
import UserInterface from "../interfaces/UserInterface";



const userSchema = new Schema<UserInterface>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true

    },
    badges:{
        type:[String]
    },
    experience:{
        type:Number,
        default:0
    },
    level:{
        type:Number,
        default:1
    },
    email_verified:{
        type:Boolean,
        default:false
    },
    health:{
        type:Number,
        default:50
    },
    healthResetCount:{
        type:Number,
        default:0
    },
    idToken:{
        type:String
    },
    accessToken:{
        type: String
    },
    appliedChallanges:{
        type:[Schema.Types.ObjectId],
        ref:"Challange"
    },
    photoUrl:{
        type:String
    }
},{timestamps:true});

const User=model<UserInterface>("User",userSchema);

export default User;