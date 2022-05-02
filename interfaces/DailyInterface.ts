import {Types} from 'mongoose';
interface DailyInterface {
    title:string,
    description:string,
    userId:Types.ObjectId,
    challagneId:Types.ObjectId,
    checklists:[string],
    startDate:Date,
    difficulty:boolean[],
    days:boolean[],
    tags:[string],
    reminder:Date,
    createdAt:Date  

}
export default DailyInterface;