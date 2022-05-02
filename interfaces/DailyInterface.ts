import {Types} from 'mongoose';
interface DailyInterface {
    title:string,
    description:string,
    userId:Types.ObjectId,
    challagneId:Types.ObjectId,
    checklists:[string],
    startDate:Date,
    difficulty:boolean[],
    days:string,
    tags:[string],
    reminder:Date,
    createdAt:Date  

}
export default DailyInterface;