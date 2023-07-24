import Joi from "joi";

export const LoginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    "any.required": `Email is a required field`,
  }),

  password: Joi.string().required().messages({
    "any.required": `Password is a required field`,
  }),
});
