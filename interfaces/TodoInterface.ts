import {Types} from 'mongoose';
interface TodoInterface {
    title:string,
    description:string,
    userId:Types.ObjectId,
    challagneId:Types.ObjectId,
    checklists:[string],
    dueDate:Date
    reminderDate:Date,
    type:boolean,
    tags:[string],
    completedParticipants:[Types.ObjectId],
    difficulty:boolean[],
    reminderTime:String,
    createdAt:Date

    


}
export default TodoInterface;