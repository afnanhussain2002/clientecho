import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must not contain special character")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Only contains alphanumeric characters (letters and numbers)."
  );
