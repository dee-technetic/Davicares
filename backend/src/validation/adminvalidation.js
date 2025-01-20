import Joi from 'joi';

export const registerSchema = Joi.object({
    gender: Joi.string().valid('male', 'female').required(),
    email: Joi.string().required(),
    username: Joi.string().required().min(5).max(20),
    role: Joi.string().valid('admin').required(),
    password: Joi.string().required().min(10).max(40)
})