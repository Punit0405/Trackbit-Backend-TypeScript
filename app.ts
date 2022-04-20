import express from "express";
import "dotenv/config";
import userRouter from "./Routes/userRoutes";
import Dbconnection from "./DBConnection/connect";
import habitRouter from "./Routes/habitRoutes";

const userRoutes = new userRouter().router;
const habitRoutes = new habitRouter().router;
import TodoRouter from "./Routes/todoRoutes";

const todoRoutes = new TodoRouter().router;
import DailyRouter from "./Routes/dailyRoutes";

const dailyRoutes = new DailyRouter().router;
const db = new Dbconnection();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }
  private routes(): void {
    this.app.use("/api/v1/user", userRoutes);
    this.app.use("/api/v1/habit", habitRoutes);
    this.app.use("/api/v1/todo", todoRoutes);
    this.app.use("/api/v1/daily", dailyRoutes);
  }
}

export default new App().app;
