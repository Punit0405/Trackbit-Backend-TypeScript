import {check,validationResult} from "express-validator";
import {  Response ,NextFunction} from "express";
import RequestUser from "../Middlewares/RequestInterface";

class ForgotpasswordValidator{
    public validatePasswords =[
        check("otp","otp should have only 6 characters").isLength({min:6 , max:6} ),
        check("password","Password must have atleast 6 characters").isLength({min:6}),
        check("confirmpassword","Password must have atleast 6 characters").isLength({min:6}),
        check("email","Email id is not valid").isEmail(),
    
        (req:RequestUser, res:Response, next:NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array().map((error)=>{
                    return {
                        value:error.value,
                        msg:error.msg
                    };
                }) });
            }
            else next();
        }
    ];

}
export default ForgotpasswordValidator;