const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name Is Required" })
    .trim()
    .min(3, { message: "Name Must be at least of 3 char" })
    .max(255 , {message:"At max 255"}),

    email : z
    .string({ required_error: "email Is Required" })
    .trim()
    .email({message:"Invalid Email"})
    .min(3, { message: "Name Must be at least of 3 char" })
    .max(255 , {message:"At max 255"}),

    phone: z
    .string({ required_error: "phone Is Required" })
    .trim()
    .min(10, { message: "Name Must be at least of 10 char" })
    .max(20 , {message:"At max 20"}),

    password: z
    .string({ required_error: "password Is Required" })
    .trim()
    .min(7, { message: "Name Must be at least of 7 char" })
    .max(255 , {message:"At max 255"}),
});


module.exports = signupSchema;