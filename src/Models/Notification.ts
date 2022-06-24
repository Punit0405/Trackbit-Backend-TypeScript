import { Schema ,model} from "mongoose";
import NotificationInterface from "../interfaces/NotificationsInterface";


const notificationSchema = new Schema<NotificationInterface>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String
    },
    body:{
        type:String
    },
   
    
  

  
   
},{timestamps:true});

const Notification = model<NotificationInterface>("Notifications",notificationSchema);

export default Notification;