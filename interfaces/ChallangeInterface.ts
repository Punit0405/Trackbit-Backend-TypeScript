import {Types} from "mongoose";
interface ChallangeInterface {
    title:string,
    description:string,
    userId:Types.ObjectId,
    createdAt:Date,
    dailies:[Types.ObjectId],
    todos:[Types.ObjectId],
    habits:[Types.ObjectId],
    participants:[Types.ObjectId],
    experience:number


}
export default ChallangeInterface;