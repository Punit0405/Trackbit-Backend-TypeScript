import express, { Request, Response } from "express";
import RequestUser from "../Middlewares/RequestInterface";

class Routes {
    public router:express.Router;
    constructor(){
        this.router=express.Router();
        this.routes()

    }
    private routes(){
       this.router.route('/').get((req:RequestUser,res:Response):Response=>{
           return res.json({status:true,data:"TrackBit Server is Always Spinning For You! Thanks And Continue Routing !"})
       })
       this.router.route('*').get((req,res,next) =>{
           return res.status(400).json({status:false,data:"Make Sure Route is Correct"})
       })
    }
}
export default Routes;