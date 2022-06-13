import express from "express";
import UserClass from "../Controllers/UserController";
import isLoggedin from "../Middlewares/isLoggedin";
import UserValidator from "../Validations/userValidator";

const UserController = new UserClass();
const userValidator = new UserValidator();
class UserRoutes {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  private routes() {
    this.router
      .route("/userregister")
      .post(userValidator.validateUser, UserController.userRegister);
    //Route for Email Verficaiton
    this.router.route("/verifyuser/:token").get(UserController.verifyUser);
    this.router.route("/resendemail").post(UserController.sendVerifyLink);
    //Route for User Login Through Email And Password
    this.router.route("/userlogin").post(UserController.userLogin);

    //Route for User Login With google
    this.router.route("/usergooglelogin").post(UserController.userGoogleLogin);

    this.router
      .route("/userfacebooklogin")
      .post(UserController.userFacebookLogin);

    //Route for User Logout
    this.router
      .route("/usergooglelogout")
      .get(isLoggedin, UserController.userGoogleLogout);

    // Route for User Information
    this.router.route("/fetchuser").get(isLoggedin, UserController.fetchUser);
    this.router
      .route("/fetchuserlevels")
      .get(isLoggedin, UserController.fetchExperience);
    this.router
      .route("/fetchappliedchallanges")
      .get(isLoggedin, UserController.fetchAppliedChallanges);

    // Route For Increasing User Experience
    this.router
      .route("/increaseUserExperience")
      .post(isLoggedin, UserController.increaseExperience);

    //Route For Decreasing User Health
    this.router
      .route("/decreaseUserHealth")
      .post(isLoggedin, UserController.decreaseHealth);

    this.router
      .route("/getforgotpasswordtoken")
      .post(UserController.getForgotToken);
    this.router.route("/forgotuser/:token").get(UserController.forgotUser);
  }
}
export default UserRoutes;
