import {Types} from 'mongoose';
interface DailyInterface {
    title:string,
    description:string,
    userId:Types.ObjectId,
    checklists:[string],
    startDate:Date,
    days:string,
    tags:[string],
    reminder:Date,
    createdAt:Date

    


}
export default DailyInterface