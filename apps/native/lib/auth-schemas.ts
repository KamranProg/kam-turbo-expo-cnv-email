import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .pipe(z.email("Enter a valid email address"));

const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Use at least 8 characters");

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  password: passwordSchema,
});
