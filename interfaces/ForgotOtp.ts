import {Types} from "mongoose";
interface ForgotOtp {
    email:string,
    otp:string,
    id:string,
    createdAt:Date

}
export default ForgotOtp;