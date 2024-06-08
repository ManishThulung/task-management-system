import { NextFunction, Request, Response } from "express";
import {
  create,
  deleteOne,
  findAllAdmin,
  getAll,
  getById,
  getTasksWithPaginationAndSearch,
  update,
} from "../services/task.services";
import ErrorHandler from "../utils/ErrorHandler";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface CustomRequest extends Request {
  user: User;
}

export const createTask = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await create(
      req.body.title,
      req.body.description,
      req.user.id
    );
    return res.status(201).json({ message: "Create successful", data: task });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, perPage, page } = req.query;

    const searchValue: string = typeof search === "string" ? search : null;
    const pageNo: number =
      typeof page === "string"
        ? typeof parseInt(page) == "number" && parseInt(page)
        : 1;
    const pageSize: number =
      typeof perPage === "string"
        ? typeof parseInt(perPage) == "number" && parseInt(perPage)
        : 10;

    const { tasks, totalCount } = await getTasksWithPaginationAndSearch(
      searchValue,
      req.user.id,
      pageNo,
      pageSize
    );

    if (!tasks) {
      next(new ErrorHandler(404, "No data available"));
    }
    if (tasks.length <= 0) {
      return res.status(200).json({
        message: "No tasks available",
      });
    }
    return res.status(200).json({
      totalTasks: totalCount,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const task = await getById(id);
    if (!task) {
      return next(new ErrorHandler(404, "Task not found"));
    }

    if (task.taskOwner.toString() !== req.user.id) {
      throw new ErrorHandler(403, "You are not authorized to update this task");
    }

    return res.status(200).json({
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;

    const task = await getById(id);
    if (!task) {
      return next(new ErrorHandler(404, "Task not found"));
    }

    if (task.taskOwner.toString() !== req.user.id) {
      throw new ErrorHandler(403, "You are not authorized to update this task");
    }

    await update(id, title, description, isCompleted);
    return res.status(201).json({ message: "Update successful" });
  } catch (error) {
    next(error);
  }
};

export const getCompletedTask = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await getAll(req.user.id);
    if (!tasks) {
      return next(new ErrorHandler(404, "No completed task found"));
    }

    return res.status(200).json({ data: tasks });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const task = await getById(id);
    if (!task) {
      return next(new ErrorHandler(404, "Task not found"));
    }

    if (task.taskOwner.toString() !== req.user.id) {
      throw new ErrorHandler(403, "You are not authorized to delete this task");
    }

    await deleteOne(id);
    return res.status(201).json({ message: "Delete successful" });
  } catch (error) {
    next(error);
  }
};

export const getAdminTasks = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await findAllAdmin();

    if (!tasks) {
      next(new ErrorHandler(404, "No data available"));
    }

    return res.status(200).json({
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};
