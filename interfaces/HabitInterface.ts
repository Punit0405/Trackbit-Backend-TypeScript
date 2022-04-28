import {Types} from "mongoose";
interface HabitInterface {
    title:string,
    description:string,
    userId:Types.ObjectId,
    challagneId:Types.ObjectId,
    habitType:boolean,
    duration:number,
    tags:[string],
    reminder:Date,
    createdAt:Date

    


}
export default HabitInterface;