import { Router } from "express";
import TaskController from "../controller/taskController";
import ValidationFunction from "../validation/ValidationTaskFunctions";
import RegularValidationFunction from "../validation/RegularValidationFunction";
import authMiddleware from "../middleware/CheckAuthMiddleware";


const TaskRouter = Router();

const controller = TaskController

TaskRouter.post('/createTask', ValidationFunction.validateTask,authMiddleware,controller.CreateTask);
TaskRouter.post('/deleteTask',ValidationFunction.validateTaskDell,authMiddleware,controller.deleteTask);
TaskRouter.post('/DeleteAllTasksUser',RegularValidationFunction.validateUserIdOnly,authMiddleware,controller.DeleteAllTasksUser);
TaskRouter.post('/getAllUserTask',RegularValidationFunction.validateUserIdOnly,authMiddleware,controller.getAllUserTask);

export default TaskRouter;