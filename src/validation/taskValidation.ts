import Joi from 'joi';

export const createTaskSchema = Joi.object({
    taskTitle: Joi.string().trim().min(10).required().messages({
        'string.empty': 'Название не может быть пустым.',
        'any.required': 'Укажите название задачи.',
    }),
    taskBody: Joi.string().trim().min(10).required().messages({
        'string.empty': 'Тело задачи не может быть пустым.',
        'any.required': 'Тело задчи обязательно для заполнения.',
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
    TaskBody: Joi.string().trim().min(10).required().messages({ 
        'string.empty': 'Тело задачи не может быть пустым.',
        'any.required': 'Тело задчи обязательно для заполнения.',
    })
})