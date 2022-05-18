import {Types} from 'mongoose';
interface HabitInterface {
    title:string,
    description:string,
    userId:Types.ObjectId,
    challagneId:Types.ObjectId,
    habitType:boolean[],
    duration:boolean[],
    type:boolean,
    difficulty:boolean[],
    tags:[string],
    reminder:string,
    createdAt:Date

    


}
export default HabitInterface;