import Joi from "joi";

export  const attendanceValiadtion =Joi.object({
    user:Joi.string().min(3).required().messages({
       "string":"at least three character",
       "required":"required", 
    }),
 
    status:Joi.string().required().messages({

    }),
    date:Joi.string().required().messages({
        "String":"must select ",
        "required":"date is required"
    })

})