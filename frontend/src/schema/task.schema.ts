import { z, ZodType } from "zod";
import { TaskFormData } from "../types/task.types";

export const addTaskSchema: ZodType<TaskFormData> = z.object({
  title: z
    .string()
    .min(2, { message: "Title is too short" })
    .max(20, { message: "Title is too long" }),
  description: z.string().min(5, { message: "Description is too short" }),
  isCompleted: z.boolean(),
});
