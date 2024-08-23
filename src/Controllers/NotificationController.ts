import axios from "axios";
import Notification from "../Models/Notification";
import RequestUser from "../Middlewares/RequestInterface";
import { Response } from "express"; 
import NotificationInterface from "../interfaces/NotificationsInterface";
class NotificationClass {
    public sendNotification = async (registrationids:string[],userId:string , title:string,body:string) =>{
        axios.post("https://fcm.googleapis.com/fcm/send",{
            "registration_ids": registrationids,
            "notification": {
                "body": body,
                "title": title,
                "android_channel_id": "push_notification",
                "sound": false
            }
        },{
            headers:{
              "Content-type":"application/json",
              "Authorization":`key=${process.env.FCM_SERVER_KEY}`
          
            }
          }).then(()=>{
            console.log("sent");
            let notification = new Notification({
              userId:userId,
              title:title,
              body:body
            });
            notification.save();

          })      
           
          

    }
    public getNotification = async (req:RequestUser,res:Response)=>{
      const notifications = await Notification.find({userId:req.user.id});
      res.status(200).json({status:true,data:notifications})

    }
}


export default NotificationClass;