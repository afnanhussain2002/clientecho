import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must not contain special character")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Only contains alphanumeric characters (letters and numbers)."
  );

  export const singUpSchema = z.object({
    username: usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6, {message:"password must be at least 6 characters"})
  })