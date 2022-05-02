import {Types} from 'mongoose';
interface TodoInterface {
    title:string,
    description:string,
    userId:Types.ObjectId,
    challagneId:Types.ObjectId,
    checklists:[string],
    dueDate:Date
    tags:[string],
    difficulty:boolean[],
    reminder:String,
    createdAt:Date

    


}
export default TodoInterface;