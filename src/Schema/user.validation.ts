import Joi from "joi";

export  const usersValiadtion =Joi.object({
    name:Joi.string().min(3).required().messages({
       "string":"at least three character",
       "required":"required", 
    }),
    email:Joi.string().required().messages({
        "string":"must be string",
        "required":"must required",
    }),
    role:Joi.string().required().messages({

    }),
    attendance:Joi.string().required().

})