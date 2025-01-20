import Joi from "joi";
export const appointmentValidationSchema = Joi.object({
    fullname: Joi.string().required().max(255),
    email: Joi.string().email().required().lowercase(),
    phoneNumber: Joi.string().required(),
    date: Joi.date().required(),
  });