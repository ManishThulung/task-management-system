import { z, ZodType } from "zod";
import { FormData } from "../types/form.types";

export const UserRegistrationSchema: ZodType<FormData> = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(2, { message: "Name is too short" })
    .max(20, { message: "Name is too long" }),
  password: z
    .string()
    .min(4, { message: "Password is too short" })
    .max(15, { message: "Password is too long" }),
});

export const UserLoginSchema: ZodType<Omit<FormData, "name">> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Password is too short" })
    .max(15, { message: "Password is too long" }),
});
