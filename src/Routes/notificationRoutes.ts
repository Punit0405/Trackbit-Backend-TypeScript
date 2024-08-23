import express from "express";
import NotificationClass from "../Controllers/NotificationController";
import isLoggedin from "../Middlewares/isLoggedin";
const NotificationController = new NotificationClass();

class NotificationRouter {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  private routes() {
    this.router
      .route("/getnotifications")
      .get(isLoggedin, NotificationController.getNotification);
  }
}
export default NotificationRouter;
