import {Types} from "mongoose";
interface UserInterface {
    name:string,
    email:string,
    password:string,
    badges:[string],
    experience:number,
    level:number,
    health:number,
    email_verified:boolean,
    healthResetCount:number,
    idToken:string,
    accessToken:string,
    appliedChallanges:[Types.ObjectId],
    photoUrl:string,
    createdAt:Date

    


}
export default UserInterface;