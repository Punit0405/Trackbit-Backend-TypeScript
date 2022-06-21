import {Types} from "mongoose";
interface NotificationInterface {
  userId:Types.ObjectId,
  habitNotifications:[string],
  todoNotifications:[string],
  dailyNotifications:[string]


   

    


}
export default NotificationInterface;