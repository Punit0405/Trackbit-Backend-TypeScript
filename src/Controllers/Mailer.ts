import nodemailer from "nodemailer";

class Transporter{
    public transporter:nodemailer.Transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port:456,
            auth: {
                user: process.env.MAILER_EMAIL as string,
                pass: process.env.MAILER_PASSWORD as string
            }
        });
        
    }

}
export default new Transporter().transporter;

