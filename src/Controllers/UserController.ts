import { Response ,NextFunction } from "express";
import User from "../Models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mailer from "./Mailer";
import client from "./GoogleAuthClient";
import { TokenPayload } from "google-auth-library";
import axios from "axios";
import RequestUser from "../Middlewares/RequestInterface";
import Logger from "../Logger/Logger";
import otpGenerator from "otp-generator";
import Forgot from "../Models/Forgot";
import Habit from "../Models/Habit";
import Daily from "../Models/Daily";
import Todo from "../Models/Todo";
import Challange from "../Models/Challange";

const logger = new Logger().logger;

class UserClass {
    public userRegister = async (req: RequestUser, res: Response) => {

        const { name, email, password, confirmpassword } = req.body;
        if (!confirmpassword) {
            return res
                .status(400)
                .json({ status: false, data: "Confirm Password is not provided" });
        }
        if (password !== confirmpassword) {
            return res
                .status(400)
                .json({ status: false, data: "Password Doesn't Match" });
        }
        const user = await User.find({ email: email });
        if (user.length !== 0) {
            return res
                .status(400)
                .json({ status: false, data: "User Already Exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const dbUser = new User({
            name: name,
            email: email,
            password: hashPassword,

        });

        try {
            const token = await jwt.sign(
                { email: email },
                process.env.JWT_USER_REGISTER_SECRET_KEY as string,
                { expiresIn: "10m" }
            );

            const mailOptions = {
                from: "tewani0405@gmail.com",
                to: email,
                subject: "TrackBit User Verification Email",
                html: `<h2>Click Here To Verify</h2> <br><a href="${process.env.AWSHOST}/api/v1/user/verifyuser/${token}">${process.env.AWSHOST}/api/v1/verifyuser/${token}</a><br><br><h1 style="text-align:center">Thanks From Registerting With Us !</h1><br>
          <h1 style="text-align:center">From,Track Bit</h1>`,
            };
            mailer.sendMail(mailOptions, function (error: any) {
                if (error) {
                    logger.error(error.message);
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
            logger.error(error.message);
            return res.status(501).json({
                succss: false,
                data: "Internal Server Error,Try After Some Time",
            });
        }

    };

    public verifyUser = async (req: RequestUser, res: Response) => {

        const token = req.params.token;

        try {
            interface Jwtverify {
                name: string;
                email: string;
                password: string;
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
            const databaseCheck = await User.findOne({ email: user.email });
            if (!databaseCheck) {
                return res.status(400).json({ status: false, data: "User Not Registered,Please Register" });
            }
            if (databaseCheck.email_verified) {
                return res.status(401).json({
                    status: false,
                    data: "Email is Already Verified , Please Continue To Login",
                });
            }
            databaseCheck.email_verified = true;
            res.status(301).redirect("https://uo0oq.test-app.link/1uaasyGZuqb");
            // res
            //     .status(200)
            //     .json({status:true,data:"Email Verified , Continue to login"});
            return await databaseCheck.save();
        } catch (error: any) {
            return res
                .status(400)
                .json({ status: false, data: "Link Expired ! Please Re-Register" });
        }

    };
    public sendVerifyLink = async (req: RequestUser, res: Response) => {

        const { email } = req.body;
        if (!email) {
            return res.status(404).json({ status: false, data: "Please Provide Email Id" });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ status: false, data: "User not exists,Please Register first" });
        }
        if (user.email_verified) {
            return res.status(400).json({ status: false, data: "Email is already verified" });

        }
        try {
            const token = await jwt.sign(
                { email: email },
                process.env.JWT_USER_REGISTER_SECRET_KEY as string,
                { expiresIn: "10m" }
            );

            const mailOptions = {
                from: "tewani0405@gmail.com",
                to: email,
                subject: "TrackBit User Verification Email",
                html: `<h2>Click Here To Verify</h2> <br><a href="${process.env.AWSHOST}/api/v1/user/verifyuser/${token}">${process.env.AWSHOST}/api/v1/verifyuser/${token}</a><br><br><h1 style="text-align:center">Thanks From Registerting With Us !</h1><br>
            <h1 style="text-align:center">From,Track Bit</h1>`,
            };
            mailer.sendMail(mailOptions, function (error: any) {
                if (error) {
                    logger.error(error.message);
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
            logger.error(error.message);

            return res.status(501).json({
                succss: false,
                data: "Internal Server Error,Try After Some Time",
            });
        }




    };

    public userLogin = async (req: RequestUser, res: Response) => {


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
                .status(400)
                .json({ status: false, data: "Invalid Credentials" });
        }


        if (await bcrypt.compare(userPassword, user.password)) {
            if (!user.email_verified) {
                return res.status(400).json({ status: false, data: "Email is not verified, Please Verify" });
            }
            const loginData = {
                id: user._id,
                email: user.email,
            };
            const token = await jwt.sign(
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

    };
    public userGoogleLogin = async (req: RequestUser, res: Response) => {

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
        const token = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.CLIENT_ID,
        });
        const payload: TokenPayload | undefined = token.getPayload();
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
            const user = {
                id: databaseCheck._id,
                email: databaseCheck.email,
            };
            databaseCheck.accessToken = accessToken;
            const authToken = await jwt.sign(
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
            const newUser = new User({
                email: payload.email,
                name: payload.name,
                password: databasePassword,
                photoUrl: payload.picture,
                accessToken: accessToken,
                idToken: idToken,
            });
            const user = {
                id: newUser._id,
                email: newUser.email,
            };
            const authToken = await jwt.sign(
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

  }
  public userFacebookLogin = async (req: RequestUser, res: Response) => {
    const accessToken = req.body.accessToken;
    if (!accessToken) {
      return res
        .status(400)
        .json({ status: false, data: "accessToken Not Provided" });
    }
    const result: any = await axios.get(
      `https://graph.facebook.com/v2.12/me?fields=name,picture,first_name,last_name,email&access_token=${accessToken}`
    );
    const payload: any = result.data;
    const databaseCheck = await User.findOne({ email: payload.email });
    if (databaseCheck) {
      const user = {
        id: databaseCheck._id,
        email: databaseCheck.email,
      };
      databaseCheck.accessToken = accessToken;
      const authToken = await jwt.sign(
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
      const newUser = new User({
        email: payload.email,
        name: payload.name,
        password: databasePassword,
        email_verified:true,
        photoUrl: payload.picture.data.url,
        accessToken: accessToken,
      });
      const user = {
        id: newUser._id,
        email: newUser.email,
      };
      const authToken = await jwt.sign(
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
  };
  public userGoogleLogout = async (req: RequestUser, res: Response) => {
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
  };

  public increaseExperience = async (req: RequestUser, res: Response) => {
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
    while (loggedinUser.experience > 50) {
      loggedinUser.experience = loggedinUser.experience - 50;
      loggedinUser.level++;
    }
    return await loggedinUser.save();
  };
  public decreaseHealth = async (req: RequestUser, res: Response) => {
    const health = req.body.health;
    if (!health) {
      return res
        .status(400)
        .json({ status: false, data: "Health not provided" });
    }
    const loggedinUser = await User.findById(req.user.id);
    if (!loggedinUser) {
      return res
        .status(404)
        .json({ status: false, data: "User doesn't exists any more!" });
    }
    loggedinUser.health = loggedinUser.health - health;
    res.status(200).json({ status: true, data: "Health Updataed" });
    while (loggedinUser.health <= 0) {
      loggedinUser.health = 50;
      loggedinUser.healthResetCount++;
      loggedinUser.experience -= 10;

      if (loggedinUser.experience <= 0) {
        loggedinUser.experience = 0;
        loggedinUser.level--;
      }
    }

    return await loggedinUser.save();
  };

  public fetchUser = async (req: RequestUser, res: Response) => {
    const loggedinUser = await User.findById(req.user.id).select([
      "-password",
      "-appliedChallanges",
      "-createdAt",
      "-email_verified",
    ]);
    if (!loggedinUser) {
      return res.status(200).json({ status: false, data: "No User Exists" });
    }
    return res.status(200).json({ status: true, data: loggedinUser });
  };
  public fetchAppliedChallanges = async (req: RequestUser, res: Response) => {
    const loggedinUser = await User.findById(req.user.id).populate({
      path: "appliedChallanges",
      populate: [
        {
          path: "habits",
          model: "Habit",
          select: "title description tags",
        },
        { path: "dailies", select: "title description tags", model: "Daily" },
        { path: "todos", select: "title description tags", model: "Todo" },
      ],
    });
    if (!loggedinUser) {
      return res
        .status(404)
        .json({ status: false, data: "User Doen't Exists More" });
    }
    return res
      .status(200)
      .json({ status: true, data: loggedinUser.appliedChallanges });
  };
  public fetchExperience = async (req: RequestUser, res: Response) => {
    const loggedinUser = await User.findById(req.user.id).select([
      "-password",
      "-appliedChallanges",
      "-createdAt",
      "-email_verified",
    ]);
    if (!loggedinUser) {
      return res.status(200).json({ status: false, data: "No User Exists" });
    }
    return res
      .status(200)
      .json({
        status: true,
        data: {
          level: loggedinUser.level,
          experience: loggedinUser.experience,
          health: loggedinUser.health,
        },
      });
  };
  public getForgotToken = async (req: RequestUser, res: Response) => {
    const { email } = req.body;
    const reqUser = await User.findOne({ email: email });
    if (!reqUser) {
      return res
        .status(404)
        .json({ status: false, data: "User Not Found , Please Register" });
    }
    const token = await jwt.sign(
      { email: email },
      process.env.JWT_USER_REGISTER_SECRET_KEY as string,
      { expiresIn: "10m" }
    );

    const mailOptions = {
      from: "tewani0405@gmail.com",
      to: email,
      subject: "TrackBit Forgot Password Email",
      html: `<h2>Click Here To Verify</h2> <br><a href="${process.env.AWSHOST}/api/v1/user/forgotuser/${token}">${process.env.AWSHOST}/api/v1/user/forgotuser/${token}</a><br><br><h1 style="text-align:center">Thanks From Registerting With Us !</h1><br>
  <h1 style="text-align:center">From,Track Bit</h1>`,
    };
    mailer.sendMail(mailOptions, function (error: any) {
      if (error) {
        logger.error(error.message);
        return res.status(501).json({
          success: false,
          data: "Internal Error Occured Please Try After Sometime",
        });
      } else {
        console.log("success");
        console.log(token)
        res.status(200).json({
          success: true,
          data: "Mail has been sent to email id , Kindly update your password",
        });
      }
    });
  };
  public forgotUser = async (req: RequestUser, res: Response) => {
    const { token } = req.params;
   
    interface Jwtverify {
      email: string;
      
    }

    const payload: Jwtverify = (await jwt.verify(
      token,
      process.env.JWT_USER_REGISTER_SECRET_KEY as string
    )) as Jwtverify;
   
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return res
        .status(404)
        .json({ status: false, data: "User not found invalid token" });
    }
    console.log(user)
    const otp = await otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const dbOtp = new Forgot({
      otp: otp,
      email: user.email,
      id: user._id,
    });
    const url = await axios.post(
      " https://api2.branch.io/v1/url",
      {
        branch_key: `${process.env.BRANCH_KEY as string}`,
        channel: "facebook",
        feature: "onboarding",
        campaign: "new product",
        stage: "new user",
        tags: ["one", "two", "three"],
        data: {
          $canonical_identifier: "content/123",
          title: `${otp}`,
          desc: `${user.email}`,
          $og_image_url: "",
          $desktop_url: "",
          custom_boolean: true,
          custom_integer: 1243,
          custom_string: "everything",
          custom_array: [1, 2, 3, 4, 5, 6],
          custom_object: { random: "dictionary" },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.status(301).redirect(url.data.url as string);
    return dbOtp.save();
  };
  public updatePassword = async (req: RequestUser, res: Response) => {
    const { otp, email, password, confirmpassword } = req.body;
    const dbOtp = await Forgot.findOne({ otp: otp });
    if(password !== confirmpassword){
        return res.status(400).json({status:false,data:"Password and Confirm password not same"})
    }
    if (!dbOtp) {
      return res
        .status(404)
        .json({ status: false, data: "Otp not found or ExpiredOtp" });
    }
    if (dbOtp.email !== email) {
      return res
        .status(400)
        .json({ status: false, data: "Otp mismatch with emailid" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.findOneAndUpdate({email:email},{$set : {password:hashPassword}});
    return res.status(200).json({status:true,data:'Password Updated Successfully'})
    
  };
  public resetAccount = async (req:RequestUser,res:Response) =>{
  
    return res.status(200).json({status:true,data:"User Reset Successfully"})      
  }
  public accountReset= async (req:RequestUser ,res:Response , next:NextFunction) => {
    const loggedinUser = await User.findById(req.user.id);
    if(!loggedinUser){
      return res.status(404).json({status:false,data:"User Doesnot Exists"});

    } 
    loggedinUser.level=1;
    loggedinUser.health=50;
    loggedinUser.experience=0;
    await loggedinUser.save();    
      await Habit.deleteMany({userId:req.user.id});
      await Todo.deleteMany({userId:req.user.id});
      await Daily.deleteMany({userId:req.user.id});
    loggedinUser.appliedChallanges.forEach(async (challange)=>{
      await Challange.findByIdAndUpdate(challange, {
        $pull: { participants: req.user.id },
    });
    await User.findByIdAndUpdate(req.user.id , {$unset:{appliedChallanges:""}});
    })
    await Challange.deleteMany({userId:req.user.id});
    next();
    
  }
  public deleteAccount = async (req:RequestUser , res:Response) =>{
      await User.findByIdAndDelete(req.user.id);
      return res.status(200).json({status:true,data:"User Deleted Successfully"})

  }
}

export default UserClass;
