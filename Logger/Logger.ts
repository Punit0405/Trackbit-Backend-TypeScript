import winston from "winston";
import { createLogger, format } from "winston";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const timezoned = () => {
    return new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata"
    })
};

class Logger {
    public logger:winston.Logger;
    constructor(){
        this.logger = createLogger({
            format: combine(
                label({ label: "Trackbit!" }),
                timestamp({format:timezoned}),
                myFormat
            ),

            defaultMeta: { service: "user-service" },
            transports: [
                //
                // - Write all logs with importance level of `error` or less to `error.log`
                // - Write all logs with importance level of `info` or less to `combined.log`
                //
                new winston.transports.Console({level:"info"}),
                new winston.transports.File({ filename: "error.log", level: "error" }),
                new winston.transports.File({ filename: "logs.log" }),
            ],
        }); 
    }
}
export default Logger;