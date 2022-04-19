import mongoose from "mongoose";
import { ConnectionOptions } from "tls";

class DBConnection{
    constructor(){
        mongoose.connect(process.env.DATABASE_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } as ConnectionOptions).then(()=>{
              console.log("Connected to Trackbit Database")
          }).catch((error)=>{
              console.log(error)
          })
     
    }
}
export default DBConnection;