import { Request, Response } from "express";
import User from "../Models/User";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import mailer from "./Mailer";
import client from "./GoogleAuthClient";
import { TokenPayload } from "google-auth-library";
import axios from "axios";
import RequestUser from "../Middlewares/RequestInterface";

class UserClass {
  public userRegister = async (req: RequestUser, res: Response) => {
    try {
      const { name, email, password, confirmpassword } = req.body;
      if (!name) {
        return res
          .status(400)
          .json({ status: false, data: "Name is not provided" });
      }
      if (!email) {
        return res
          .status(400)
          .json({ status: false, data: "Email is not provided" });
      }
      if (!password) {
        return res
          .status(400)
          .json({ status: false, data: "PassWord is not provided" });
      }
      if (!confirmpassword) {
        return res
          .status(400)
          .json({ status: false, data: "Confirm Password is not provided" });
      }
      if (password !== confirmpassword) {
        return res
          .status(401)
          .json({ status: false, data: "Password Doesn't Match" });
      }
      const user = await User.find({ email: email });
      if (user.length !== 0) {
        return res
          .status(401)
          .json({ status: false, data: "User Already Exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
 
      const dbUser = new User({
        name: name,
        email: email,
        password: hashPassword,

      })
      
      try {
        let token = await jwt.sign(
          {email:email},
          process.env.JWT_USER_REGISTER_SECRET_KEY as string,
          { expiresIn: "10m" }
        );

        const mailOptions = {
          from: "tewani0405@gmail.com",
          to: email,
          subject: "TrackBit User Verification Email",
          html: `<h2>Click Here To Verify</h2> <br><a href="${process.env.HOST}/api/v1/user/verifyuser/${token}">http://localhost:5000/api/v1/verifyuser/${token}</a><br><br><h1 style="text-align:center">Thanks From Registerting With Us !</h1><br>
          <h1 style="text-align:center">From,Track Bit</h1>`,
        };
        mailer.sendMail(mailOptions, function (error: any, info: any) {
          if (error) {
            console.log(error)
            return res.status(501).json({
              success: false,
              data: "Internal Error Occured Please Try After Sometime",
            });
          } else {
            console.log("success");
            res.status(200).json({
              success: true,
              data: "Please Verify Your Email To Login",
            });
          }
        });
        return await dbUser.save();
      } catch (error: any) {
        console.log(error.message);
        return res.status(501).json({
          succss: false,
          data: "Internal Server Error,Try After Some Time",
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, data: "Some Internal Error Occured" });
    }
  };

  public verifyUser = async (req: RequestUser, res: Response) => {
    try {
      const token = req.params.token;

      try {
        interface Jwtverify {
          name: String;
          email: String;
          password: String;
        }

        const payload: Jwtverify = (await jwt.verify(
          token,
          process.env.JWT_USER_REGISTER_SECRET_KEY as string
        )) as Jwtverify;
        const user = {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        };
        let databaseCheck = await User.findOne({ email: user.email });
        if(!databaseCheck){
          return res.status(400).json({status:false,data:'User Not Registered,Please Register'})
        }
        if (databaseCheck.email_verified) {
          return res.status(401).json({
            status: false,
            data: "Email is Already Verified , Please Continue To Login",
          });
        }
        databaseCheck.email_verified=true;
         res
        .status(200)
        .json({status:true,data:'Email Verified , Continue to login'});
        return await databaseCheck.save();
      } catch (error: any) {
        return res
          .status(400)
          .json({ status: false, data: "Link Expired ! Please Re-Register" });
      }
    } catch (error: any) {

      return res
        .status(500)
        .json({ success: false, data: "Some Internal Error Occured" });
    }
  };
  public sendVerifyLink = async(req:RequestUser,res:Response)=>{
    try {
      const {email}= req.body;
      if(!email){
        return res.status(404).json({status:false,data:'Please Provide Email Id'});
      }
      const user=await User.findOne({email:email});
      if(!user){
        return res.status(404).json({status:false,data:"User not exists,Please Register first"})
      }
      if(user.email_verified){
        return res.status(400).json({status:false,data:'Email is already verified'})

      }
        try {
          let token = await jwt.sign(
            {email:email},
            process.env.JWT_USER_REGISTER_SECRET_KEY as string,
            { expiresIn: "10m" }
          );
  
          const mailOptions = {
            from: "tewani0405@gmail.com",
            to: email,
            subject: "TrackBit User Verification Email",
            html: `<h2>Click Here To Verify</h2> <br><a href="${process.env.HOST}/api/v1/user/verifyuser/${token}">http://localhost:5000/api/v1/verifyuser/${token}</a><br><br><h1 style="text-align:center">Thanks From Registerting With Us !</h1><br>
            <h1 style="text-align:center">From,Track Bit</h1>`,
          };
          mailer.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
            
              return res.status(501).json({
                success: false,
                data: "Internal Error Occured Please Try After Sometime",
              });
            } else { 
              console.log("success");
              res.status(200).json({
                success: true,
                data: "Email sent successfully, Please Verify within 10 minutes.",
              });
            }
          });
        } catch (error: any) {
          console.log(error.message);
          return res.status(501).json({
            succss: false,
            data: "Internal Server Error,Try After Some Time",
          });
        }
      

      
    } catch (error) {
      return res.status(500).json({status:false,data:"Some Internal Error Occured"})
    }
  }

  public userLogin = async (req: RequestUser, res: Response) => {

    try {
      const { userEmail, userPassword } = req.body;
      if (!userEmail) {
        return res
          .status(400)
          .json({ status: false, data: "Email ID is Not Provided" });
      }
      if (!userPassword) {
        return res
          .status(400)
          .json({ status: false, data: "Password ID is Not Provided" });
      }
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res
          .status(404)
          .json({ status: false, data: "Invalid Credentials" });
      }
     

      if (await bcrypt.compare(userPassword, user.password)) {
        if(!user.email_verified){
          return res.status(400).json({status:false,data:"Email is not verified, Please Verify"})
        }
        let loginData = {
          id: user._id,
          email: user.email,
        };
        let token = await jwt.sign(
          loginData,
          process.env.JWT_USER_LOGIN_SECRET_KEY as string
        );

        return res
          .status(200)
          .cookie("auth-token", token)
          .set("Auth-token", token)
          .json({ status: true, data: token });
      } else {
        return res
          .status(400)
          .json({ status: false, data: "Invalid Credentials" });
      }
    } catch (error: any) {
     
      return res
        .status(501)
        .json({ status: false, data: "Some Internal Error Occured" });
    }
  };
  public userGoogleLogin = async (req: RequestUser, res: Response) => {
    try {
      const idToken = req.body.idToken;
      const accessToken = req.body.accessToken;
      if (!idToken) {
        return res
          .status(400)
          .json({ status: false, data: "idToken Not Provided" });
      }
      if (!accessToken) {
        return res
          .status(400)
          .json({ status: false, data: "accessToken Not Provided" });
      }

      let token = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.CLIENT_ID,
      });
      let payload: TokenPayload | undefined = token.getPayload();
      if (!payload) {
        return res
          .status(400)
          .json({ status: false, data: "Token is invalid" });
      }
      if (!payload.email_verified) {
        return res
          .status(401)
          .json({ status: false, data: "Email ID not verified by google" });
      }
      const databaseCheck = await User.findOne({ email: payload.email });
      if (databaseCheck) {
        let user = {
          id: databaseCheck._id,
          email: databaseCheck.email,
        };
        databaseCheck.accessToken = accessToken;
        let authToken = await jwt.sign(
          user,
          process.env.JWT_USER_LOGIN_SECRET_KEY as string
        );

        res
          .status(200)
          .cookie("auth-token", authToken)
          .set("Auth-token", authToken)
          .json({ status: true, data: authToken });
        return await databaseCheck.save();
      } else {
        const salt = await bcrypt.genSalt(10);
        const databasePassword = await bcrypt.hash(
          (payload.email as string) + payload.name,
          salt
        );
        let newUser = new User({
          email: payload.email,
          name: payload.name,
          password: databasePassword,
          photoUrl: payload.picture,
          accessToken: accessToken,
          idToken: idToken,
        });
        let user = {
          id: newUser._id,
          email: newUser.email,
        };
        let authToken = await jwt.sign(
          user,
          process.env.JWT_USER_LOGIN_SECRET_KEY as string
        );
        await newUser.save();
        return res
          .status(200)
          .cookie("auth-token", authToken)
          .set("Auth-token", authToken)
          .json({ status: true, data: authToken });
      }
    } catch (error: any) {
      console.log(error.message);
      return res
        .status(500)
        .json({ status: false, data: "Some Internal Error Occured" });
    }
  };
  public userGoogleLogout = async (req: RequestUser, res: Response) => {
    try {
      const dbUser = await User.findById(req.user.id);
      if (dbUser) {
        const URL = `https://accounts.google.com/o/oauth2/revoke?token=${dbUser.accessToken}`;
        await axios.get(URL);
        return res
          .status(200)
          .json({ status: true, data: "User Has been LoggedOut" });
      } else {
        return res
          .status(400)
          .json({ status: false, data: "User doesn't exists anymore" });
      }
    } catch (error: any) {
      console.log(error.message);
      return res
        .status(500)
        .json({ status: false, data: "Some Internal Error Occured" });
    }
  };

  public increaseExperience = async (req: RequestUser, res: Response) => {
    try {
      const experience = req.body.experience;
      if (!experience) {
        return res
          .status(400)
          .json({ status: false, data: "Experience not provided" });
      }
      const loggedinUser = await User.findById(req.user.id);
      if (!loggedinUser) {
        return res
          .status(404)
          .json({ status: false, data: "User doesn't exists any more!" });
      }
      loggedinUser.experience = loggedinUser.experience + experience;
      res.status(200).json({ status: true, data: "Experience Updataed" });
      while (loggedinUser.experience >= 50) {
        loggedinUser.experience = loggedinUser.experience - 50;
        loggedinUser.level++;
      }
      return await loggedinUser.save();
    } catch (error: any) {
      console.log(error.message);
      return res
        .status(500)
        .json({ status: false, data: "Some Internal Error Occured" });
    }
  };
  public decreaseHealth = async(req:RequestUser,res:Response)=>{
    try {
        const health =  req.body.health;
        if(!health){
            return res.status(400).json({status:false,data:"Health not provided"})
        }
        const loggedinUser= await User.findById(req.user.id);
        if (!loggedinUser) {
            return res
              .status(404)
              .json({ status: false, data: "User doesn't exists any more!" });
          }
        loggedinUser.health=loggedinUser.health - health;
        res.status(200).json({status:true,data:"Health Updataed"});
        while(loggedinUser.health <=0){

            loggedinUser.health = 50;
            loggedinUser.healthResetCount++;
            loggedinUser.experience -=10;
         
            if(loggedinUser.experience <=0){
                loggedinUser.experience=0;
                loggedinUser.level--;
            }
            
        }




        return await loggedinUser.save()


        
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({status:false,data:"Some Internal Error Occured"})
        
    }
}
}

export default UserClass;
