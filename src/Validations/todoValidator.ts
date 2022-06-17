import {check,validationResult} from "express-validator";
import {  Response ,NextFunction} from "express";
import RequestUser from "../Middlewares/RequestInterface";


class TodoValidator{
    public validateTodo=[
        check("title","Title Should Contain atleast 6 letters").isLength({min:6}),
        check("description","Description should contain atleast 10 letters").isLength({min:10}),
    
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
export default TodoValidator;