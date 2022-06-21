import axios from "axios";
class NotificationClass {
    public sendNotification = async (registrationids:string[],userId:string , title:string,body:string) => {
        console.log(userId)
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
          })
        
           
          

    }
}


export default NotificationClass;