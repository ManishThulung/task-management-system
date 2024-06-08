import express from "express";
import {
  createTask,
  deleteTask,
  getAdminTasks,
  getCompletedTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/task.controller";
import { authorizedRole, verifyToken } from "../middleware/auth.middleware";
import { validation } from "../middleware/validation.middleware";
import { taskSchema, taskUpdateSchema } from "../schemas/task.schema";

const router = express.Router();

router.get("/", verifyToken, getTasks);
router.get("/completed", verifyToken, getCompletedTask);
router.get("/:id", verifyToken, getTaskById);
router.post("/", validation(taskSchema), verifyToken, createTask);
router.put("/:id", validation(taskUpdateSchema), verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);
router.get("/admin/tasks", verifyToken, authorizedRole, getAdminTasks);

export default router;
