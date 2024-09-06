import Joi from 'joi';

export const createTaskSchema = Joi.object({
    titleTask: Joi.string().trim().min(10).required().messages({
        'string.empty': 'Название не может быть пустым.',
        'any.required': 'Укажите название задачи.',
    }),
    taskBody: Joi.string().trim().min(10).required().messages({
        'string.empty': 'Тело задачи не может быть пустым.',
        'any.required': 'Тело задчи обязательно для заполнения.',
    }),
    userId: Joi.string().trim().min(10).required().messages({
        'any.required': 'userId required'
    }),
});
export const EditTaskTitle = Joi.object({ 
    TaskId: Joi.string().required().messages({ 
        'any.required': 'TaskId is required.'
    }),
    taskTitle: Joi.string().trim().min(10).required().messages({
        'string.empty': 'Название не может быть пустым.',
        'any.required': 'Укажите название задачи.',
    })
})
export const EditTaskBody = Joi.object({ 
    TaskId: Joi.string().required().messages({ 
        'any.required': 'TaskId is required.'
    }),
    taskBody: Joi.string().trim().min(10).required().messages({ 
        'string.empty': 'Тело задачи не может быть пустым.',
        'any.required': 'Тело задчи обязательно для заполнения.',
    })
})
export const TaskDell =  Joi.object({ 
    taskId: Joi.string().required().messages({ 
        'any.required': 'TaskId is required.'
    }),
    userId: Joi.string().trim().min(10).required().messages({
        'any.required': 'userId required',
    }),
})