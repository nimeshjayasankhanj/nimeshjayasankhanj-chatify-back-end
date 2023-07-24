import Joi from "joi";

export const TwoFASchema = Joi.object({
  two_fa_code: Joi.string().required().messages({
    "any.required": `Email is a required field`,
  }),

  id: Joi.string().required().messages({
    "any.required": `ID is a required field`,
  }),
});
