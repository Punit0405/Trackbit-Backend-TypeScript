import { Schema ,model} from "mongoose";
import NotificationInterface from "../interfaces/NotificationsInterface";


const notificationSchema = new Schema<NotificationInterface>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    habitNotifications:{
        type:[String]
    },
    todoNotifications:{
        type:[String]
    },
    dailyNotifications:{
        type:[String]
    }
    
  

  
   
},{timestamps:true});

const Notification = model<NotificationInterface>("Notifications",notificationSchema);

export default Notification;