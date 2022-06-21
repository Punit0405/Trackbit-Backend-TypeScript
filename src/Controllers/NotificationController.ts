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
              "Authorization":"key=AAAAoVOloIo:APA91bFwd-yDN4wJTGbuuKbXJg4c4w4rDGlKRqbLnhfY1oVuqS6NgJN35ryIMyWGQoZYQWrgKfnhkH63QQHqlA47t073AznMUIF_tEN4bLWm6_2KaIMNvQfU83MUNKP1Ip1FOf2fyIZB"
          
            }
          })
        
           
          

    }
}


export default NotificationClass;