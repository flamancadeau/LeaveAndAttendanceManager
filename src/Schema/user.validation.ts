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
    attendance:Joi.string().required().messages({
        "required":"must be required",
          "String":"must select any option"
    }),
    leave:Joi.string().required().messages({
        "String":"must select any option",
        "required":"must required"
    }),
    password:Joi.string().required().messages({
     "string":"at least anu character",
     "required":"can not be null"   
    })

})