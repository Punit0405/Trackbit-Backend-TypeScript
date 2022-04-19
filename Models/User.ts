import { Schema,Types ,model} from 'mongoose';

interface UserInterface {
    name:string,
    email:string,
    password:string,
    badges:[string],
    experience:number,
    level:number,
    health:number,
    healthResetCount:number,
    idToken:string,
    accessToken:string,
    appliedChallanges:[Types.ObjectId],
    photoUrl:string,
    createdAt:Date

    


}

const userSchema = new Schema<UserInterface>({
     name:{
         type:String,
         required:true,
     },
     email:{
         type:String,
         required:true,
         unique:true

     },
     password:{
         type:String,
         required:true

     },
     badges:{
         type:[String]
     },
     experience:{
         type:Number,
         default:0
     },
     level:{
         type:Number,
         default:1
     },
     health:{
         type:Number,
         default:50
     },
     healthResetCount:{
         type:Number,
         default:0
     },
     idToken:{
         type:String
     },
     accessToken:{
         type: String
     },
     appliedChallanges:{
         type:[Schema.Types.ObjectId],
         ref:'challange'
     },
     photoUrl:{
         type:String
     },
     createdAt:{
         type:Date,
         default:Date.now
     } 
});

const User=model<UserInterface>("User",userSchema);

export default User;