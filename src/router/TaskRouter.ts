import { Router } from "express";
import TaskController from "../controller/taskController";
import ValidationFunction from "../validation/ValidationTaskFunctions";
import RegularValidationFunction from "../validation/RegularValidationFunction";
import authMiddleware from "../middleware/CheckAuthMiddleware";


const TaskRouter = Router();

const controller = TaskController

TaskRouter.post('/createTask', ValidationFunction.validateTask,authMiddleware,controller.CreateTask);
TaskRouter.post('/deleteTask',RegularValidationFunction.validateTaskIdOnly,controller.deleteTask);
TaskRouter.post('/DeleteAllTasksUser',RegularValidationFunction.validateUserIdOnly,controller.DeleteAllTasksUser);
TaskRouter.post('/getAllUserTask',RegularValidationFunction.validateUserIdOnly,controller.getAllUserTask);

export default TaskRouter;