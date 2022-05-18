import {Types} from 'mongoose';
interface DailyInterface {
    title:string,
    description:string,
    userId:Types.ObjectId,
    challagneId:Types.ObjectId,
    checklists:[string],
    startDate:Date,
    difficulty:boolean[],
    type:boolean,
    completedParticipants:[Types.ObjectId],
    days:boolean[],
    completed:boolean,
    tags:[string],
    reminder:string,
    createdAt:Date  

}
export default DailyInterface;