import { Request,Response,NextFunction } from "express";
import { Types } from "mongoose";
import TaskService from "../service/taskService";
import ApiError from "../apiErrors/ApiErrors";

type DeleteType = { 
    TaskId: Types.ObjectId
}
interface CustomRequest extends Request {
    userId?: Types.ObjectId;
}

class TaskController{ 

    static async CreateTask(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { taskTitle, taskBody } = req.body;
            const userId = req.userId;
    
            if (!userId) {
                throw ApiError.BadRequest('Пользователь наваые авторизован');
            }
    
            const TaskData = await TaskService.CreateTask(taskTitle,taskBody,userId)

        return res.json(TaskData);
        } catch (e) {
            console.error('Ошибка при создании задачи:', e);
            next(e);
        }
    }

    static async getAllUserTask(req:Request,res:Response,next:NextFunction){ 
        try{ 

            const { UserId } = req.body;

            const TaskData = await TaskService.getAllUserTask(UserId)

            return res.json(TaskData);

        }catch(e){ 

        }
    }

    static async deleteTask(req:Request,res:Response,next:NextFunction){ 

        try{ 

            const { TaskId }:DeleteType = req.body;

            const TaskData = await TaskService.DeleteTask(TaskId)

            return res.json(TaskData)

        }catch(e){ 
            next(e);
        }

    }
    static async DeleteAllTasksUser(req:Request,res:Response,next:NextFunction){ 

        try{ 

            const {UserId} = req.body;

            const TaskData = await TaskService.DeleteAllTasksUser(UserId)

            return res.json(TaskData);

        }catch(e){ 
            next(e)
        }

    }

    static async EditTaskTitle(req:Request,res:Response,next:NextFunction){ 
        try{ 

            const {TaskId,TaskTitle} = req.body

            const TaskData = await TaskService.EditTaskTitle(TaskId,TaskTitle);

            return res.json(TaskData)

        }catch(e){ 

        }
    }
    static async EditTaskBody(req:Request,res:Response,next:NextFunction){ 
        try{ 

            const {TaskId,TaskBody} = req.body;

            const TaskData = await TaskService.EditTaskBody(TaskId,TaskBody);

            return res.json(TaskData)

        }catch(e){ 

        }
    } 
}
export default TaskController

