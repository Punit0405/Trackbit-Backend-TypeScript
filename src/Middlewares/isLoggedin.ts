import {  Response ,NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import RequestUser from "./RequestInterface";

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
        next();
    } catch (error) {
        
        return res.status(400).json({status:false,data:"Invalid Token"});
        
    }
    
};
export default isLoggedin;