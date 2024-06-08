import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" }),
  description: z
    .string()
    .min(4, { message: "Description must be at least 4 characters long" }),
});

export const taskUpdateSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" }),
  description: z
    .string()
    .min(4, { message: "Description must be at least 4 characters long" }),
  isCompleted: z.boolean(),
});
