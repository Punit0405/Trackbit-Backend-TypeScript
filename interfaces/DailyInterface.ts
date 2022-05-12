import {Types} from 'mongoose';
interface DailyInterface {
    title:string,
    description:string,
    userId:Types.ObjectId,
    challagneId:Types.ObjectId,
    checklists:[string],
    startDate:Date,
    difficulty:boolean[],
    completedParticipants:[Types.ObjectId],
    days:boolean[],
    tags:[string],
    reminder:string,
    createdAt:Date  

}
export default DailyInterface;