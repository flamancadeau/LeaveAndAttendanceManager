import Joi from "joi";

export  const LeaveValidation =Joi.object({

 status:Joi.string().optional().messages({

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