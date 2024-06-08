import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" }),
});
