import Joi from "joi"

export const MethodUserIdOnly = Joi.object({ 
    UserId: Joi.string().required().messages({
        'any.required': 'UserId is required.'
    })
})

export const MethodTaskIdOnly = Joi.object({ 
    TaskId: Joi.string().required().messages({
        'any.required': 'TaskId is required.',
    }),
})

export const MethodPermission = Joi.object({ 
    UserId: Joi.string().required().messages({
        'any.required': 'UserId is required.'
    }),
    Permission: Joi.number().valid(3).required().messages({
        'any.only': 'Недостаточно прав.'
    })
})