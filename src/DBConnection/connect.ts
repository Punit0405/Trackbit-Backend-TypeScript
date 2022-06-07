import mongoose from "mongoose";
import { ConnectionOptions } from "tls";
import Logger from "../Logger/Logger";
const logger = new Logger().logger;
class DBConnection{
    constructor(){
       
            mongoose.connect(process.env.DATABASE_URI as string, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectionOptions).then(()=>{
                logger.info("Connected to the Trackbit Database");
            }).catch((error)=>{
                console.log(error);
            });
       
      
     
    }
}
export default DBConnection;