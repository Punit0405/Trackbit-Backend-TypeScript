import {Types} from "mongoose";
interface TodoInterface {
    title:string,
    description:string,
    userId:Types.ObjectId,
    challangeId:Types.ObjectId,
    checklists:[{checklist:string,checkedParticipants?:[Types.ObjectId],checked?:boolean}],
    dueDate:Date
    reminderDate:Date,
    type:boolean,
    tags:[string],
    completedParticipants:[Types.ObjectId],
    difficulty:boolean[],
    reminderTime:string,
    createdAt:Date

    


}
export default TodoInterface;