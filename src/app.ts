import "express-async-errors";
import express from "express";
import "dotenv/config";
import userRouter from "./Routes/userRoutes";
import Dbconnection from "./DBConnection/connect";
import habitRouter from "./Routes/habitRoutes";
import ChallangeRouter from "./Routes/challangeRoutes";
import DailyRouter from "./Routes/dailyRoutes";
import TodoRouter from "./Routes/todoRoutes";
import homeRoutes from "./Validations/route";
import Logger from "./Logger/Logger";
import mailer from "./Controllers/Mailer";

const userRoutes = new userRouter().router;
const habitRoutes = new habitRouter().router;
const checkRoutes = new homeRoutes().router;
const todoRoutes = new TodoRouter().router;

const dailyRoutes = new DailyRouter().router;
const challangeRoutes = new ChallangeRouter().router;
new Dbconnection();
const logger = new Logger().logger;

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.app.use((err: any, req: any, res: any, next: any) => {
            logger.error(err.message);
            res.status(500).json({status:false,data:"Some Internal Server Error Occured"});
            const mailOptions = {
                from: "tewani0405@gmail.com",
                to: "punit.tewani.sa@gmail.com",
                subject: "Error Occured In Trackbit",
                text : err.stack
            };
            mailer.sendMail(mailOptions,(err:any)=>{
                if(err){
                    logger.error("Cannot Sent Email");
                }
            });
            next();

        });

        this.app.listen(process.env.PORT, () => {
            logger.info(`Server is running of port ${process.env.PORT}`);
        });
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
        this.app.use("/api/v1/challange", challangeRoutes);
        this.app.use("/", checkRoutes);
    }
}

export default App;
