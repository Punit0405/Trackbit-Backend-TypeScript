import { Request} from "express";
interface RequestUser extends Request{
    user?:any;
}
export default RequestUser;