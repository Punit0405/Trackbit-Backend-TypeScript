import {  Response ,NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import RequestUser from "./RequestInterface";
import User from "../Models/User";

const isLoggedin = async (req:RequestUser,res:Response,next:NextFunction)=>{

   

    if(!req.headers.authtoken){
        
        return res.status(401).json({status:false,data:"You are Not Loggedin"});
    }
    const authToken=req.headers.authtoken;
    try {
        const loggedUser:JwtPayload = await jwt.verify(authToken as string,process.env.JWT_USER_LOGIN_SECRET_KEY as string) as JwtPayload;
        if(!loggedUser.id){
            return res.status(401).json({status:false,data:"Not a valid User"});
        }
        req.user=loggedUser;
        const loggedinUser = await User.findById(req.user.id);
        if(!loggedinUser){
            return res.status(404).json({status:false,data:"User Doesn't exists anymore"})
        }
        next();
    } catch (error) {
        
        return res.status(400).json({status:false,data:"Invalid Token"});
        
    }
    
};
export default isLoggedin;