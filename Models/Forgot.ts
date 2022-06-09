import { Schema ,model} from "mongoose";
import ForgotOtp from '../interfaces/ForgotOtp'


const forgotOtpSchema = new Schema<ForgotOtp>({
    otp:{
        type:String,
        required:true,
        expires:'5m'
    },
    email:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        expires:'5m',
        default:Date.now
    }

   
} );

const Forgot = model<ForgotOtp>("Otp",forgotOtpSchema);

export default Forgot;