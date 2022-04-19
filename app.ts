import express from "express";
import "dotenv/config";
import Routes from "./Routes/route";
import Dbconnection from "./DBConnection/connect";
const routes = new Routes().router;
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
    this.app.use("/api", routes);
  }
}

export default new App().app;
