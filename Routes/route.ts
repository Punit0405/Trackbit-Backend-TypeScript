import express, { Request, Response } from "express";

class Routes {
    public router:express.Router;
    constructor(){
        this.router=express.Router();
        this.routes()

    }
    private routes(){
       this.router.route('/servercheck').get((req:Request,res:Response):Response=>{
           return res.json({msg:"Hello World"})
       })
    }
}
export default Routes;