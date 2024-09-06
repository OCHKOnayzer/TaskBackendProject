import { Request, Response, NextFunction } from 'express';
import TaskController from '../controller/taskController';
import TaskService from '../service/taskService';
import ApiError from '../apiErrors/ApiErrors';

jest.mock('../service/taskService');

describe('TaskController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {} as Partial<Request>;
    res = {
      json: jest.fn(),
    } as Partial<Response>;
    next = jest.fn();
  });

  it('should create a task', async () => {
    (TaskService.CreateTask as jest.Mock).mockResolvedValue({ titleTask: 'Test Task', taskBody: 'Task Body' });

    req.body = { titleTask: 'Test Task', taskBody: 'Task Body', userId: '1' };

    await TaskController.CreateTask(req as any, res as Response, next as NextFunction);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ titleTask: 'Test Task', taskBody: 'Task Body' });
  });

  it('should handle missing userId on task creation', async () => {
    req.body = { titleTask: 'Test Task', taskBody: 'Task Body' }; 

    await TaskController.CreateTask(req as any, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
  });

  it('should get all tasks for a user', async () => {
    (TaskService.getAllUserTask as jest.Mock).mockResolvedValue([{ titleTask: 'Test Task', taskBody: 'Task Body' }]);

    req.body = { UserId: '1' };

    await TaskController.getAllUserTask(req as any, res as Response, next as NextFunction);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([{ titleTask: 'Test Task', taskBody: 'Task Body' }]);
  });

  it('should delete a task', async () => {
    (TaskService.DeleteTask as jest.Mock).mockResolvedValue({ message: 'Task deleted' });

    req.body = { taskId: '1', userId: '1' };

    await TaskController.deleteTask(req as any, res as Response, next as NextFunction);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ message: 'Task deleted' });
  });

  it('should delete all tasks for a user', async () => {
    (TaskService.DeleteAllTasksUser as jest.Mock).mockResolvedValue({ message: 'All tasks deleted' });

    req.body = { UserId: '1' };

    await TaskController.DeleteAllTasksUser(req as any, res as Response, next as NextFunction);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ message: 'All tasks deleted' });
  });

  it('should edit a task title', async () => {
    (TaskService.EditTaskTitle as jest.Mock).mockResolvedValue({ titleTask: 'Updated Task Title' });

    req.body = { TaskId: '1', TaskTitle: 'Updated Task Title' };
    await TaskController.EditTaskTitle(req as any, res as Response, next as NextFunction);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ titleTask: 'Updated Task Title' });
  });

  it('should edit a task body', async () => {
    (TaskService.EditTaskBody as jest.Mock).mockResolvedValue({ taskBody: 'Updated Task Body' });

    req.body = { TaskId: '1', TaskBody: 'Updated Task Body' };

    await TaskController.EditTaskBody(req as any, res as Response, next as NextFunction);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ taskBody: 'Updated Task Body' });
  });
});
