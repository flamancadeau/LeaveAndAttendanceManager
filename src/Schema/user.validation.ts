import Joi from "joi";

export const usersValiadtion = Joi.object({
    name: Joi.string().min(3).required().messages({
        "string.min": "Name should have at least 3 characters",
        "required": "Name is required"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "required": "Email is required"
    }),
    role: Joi.string().valid("admin", "student", "teacher").required().messages({
        "required": "Role is required",
        "any.only": "Role must be one of 'admin', 'student', or 'teacher'"
    }),
    attendance: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).optional().messages({
        "array.base": "Attendance must be an array",
        "string.pattern.base": "Each item in the attendance array must be a valid MongoDB ObjectId"
    }),
    leave: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).optional().messages({
        "array.base": "Leave must be an array",
        "string.pattern.base": "Each item in the leave array must be a valid MongoDB ObjectId"
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters long",
        "required": "Password is required"
    })
});
