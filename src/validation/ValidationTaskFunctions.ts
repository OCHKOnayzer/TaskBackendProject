import { Request, Response, NextFunction } from "express";
import { createTaskSchema,EditTaskTitle,EditTaskBody } from "./taskValidation";
class ValidationFunction{ 

    static validateTask(req: Request, res: Response, next: NextFunction){
        const { error } = createTaskSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ errors: error.details.map(err => err.message) });
        }
        next();
    };

    static ValidateEditTaskTitle(req:Request,res:Response,next: NextFunction){ 
        const { error } = EditTaskTitle.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ errors: error.details.map(err => err.message) });
        }
        next();
    }

    static ValidateEditTaskBody(req:Request,res:Response,next: NextFunction){ 
        const { error } = EditTaskBody.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ errors: error.details.map(err => err.message) });
        }
        next();
    }

}
export default ValidationFunction