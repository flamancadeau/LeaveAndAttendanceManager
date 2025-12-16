import Joi from "joi";

export  const LeaveValidation =Joi.object({
    user:Joi.string().min(3).required().messages({
       "string":"at least three character",
       "required":"required", 
    }),
  
 status:Joi.string().required().messages({

    }),
    Startdate:Joi.string().required().messages({
        "required":"must be required",
          "String":"must select any date"
    }),
    Enddate:Joi.string().required().messages({
        "String":"must select any date",
        "required":"must required"
    }),
    reason:Joi.string().required().messages({
        "string":"must be charatcter",
        "required":"must be filled"
    })

})