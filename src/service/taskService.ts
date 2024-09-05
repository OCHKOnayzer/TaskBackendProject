import { Types } from 'mongoose';
import TaskModel from "../model/TaskModel";
import TaskDTO from '../dtos/TaskDTO';
import ApiError from "../apiErrors/ApiErrors";
import TokenModel from '../model/TokenModel';
interface TaskCreatePromise { 
    newTask: TaskDTO;
}

class TaskService { 
    static async CreateTask(taskTitle: string, taskBody: string, userId: Types.ObjectId): Promise<TaskCreatePromise>{ 
        try { 
            const newTask = new TaskModel({ taskTitle, taskBody, userId }) as any;

            await newTask.save();

            const taskDto = new TaskDTO(newTask);

            return { newTask: taskDto };
        } catch (e) {
            console.error("Ошибка при создании задачи:", e);
            throw e;
        }
    }
    static async DeleteTask(TaskId:Types.ObjectId){ 

        try{ 

            const FindTask = TaskModel.findById({_id:TaskId});

            if(!FindTask){ 
                throw ApiError.BadRequest(`Таск не найден`);
            }

            const DellTask = TaskModel.deleteOne({_id:TaskId});

            return DellTask

        }catch(e){ 
            throw e;
        };

    }

    static async DeleteAllTasksUser(UserId:Types.ObjectId){ 
        try{ 

            const FindUser = TaskModel.find({userId:UserId})

            if(!FindUser){ 
                throw ApiError.BadRequest(`У пользователя нет ни одной созданой задачи`);
            }

            const deleteAllTasksUserId = TaskModel.deleteMany({userId:UserId});

            return deleteAllTasksUserId

        }catch(e){ 
            throw e
        }
    }

    static async getAllUserTask(UserId:Types.ObjectId){ 
        try{ 

            const FindUser = TaskModel.find({userId:UserId})

            if(!FindUser){ 
                throw ApiError.BadRequest(`У пользователя нет ни одной созданой задачи`);
            }

            const FindAllTask = await TaskModel.find({userId:UserId})

            return FindAllTask

        }catch(e){ 
            throw e
        }
    }

    static async EditTaskTitle(TaskId:Types.ObjectId,TaskTitle:string){ 
        try{

            const TaskEdit = await TaskModel.findById(TaskId);

            if(!TaskEdit){ 
                throw ApiError.BadRequest(`Произошла ошибка при получении данных задачи`);
            }

            if(TaskEdit.titleTask === TaskTitle){ 
                throw ApiError.BadRequest(`Внесите минимальные изменения в название задачи задачи`);
            }

             TaskEdit.titleTask = TaskTitle

             await TaskEdit.save();

             return TaskEdit;

        }catch(e:any){ 
            throw ApiError.ServerError(e.message)
        }
    }

    static async EditTaskBody(TaskId:Types.ObjectId,TaskBody:string){ 

        try {
            const taskEdit = await TaskModel.findById(TaskId);

            if (!taskEdit) {
                throw ApiError.BadRequest(`Произошла ошибка при получении данных задачи`);
            }

            if (taskEdit.bodyTask === TaskBody) {
                throw ApiError.BadRequest(`Внесите минимальные изменения в тело задачи`);
            }

            taskEdit.bodyTask = TaskBody;

            await taskEdit.save();

            return taskEdit;
        }catch(e:any){ 
            throw ApiError.ServerError(e.message)
        }

    }

}

export default TaskService;
