import { FilterQuery } from "mongoose";
import Task, { TaskDocument } from "../models/task.model";
import ErrorHandler from "../utils/ErrorHandler";

interface TaskDocumentsAndCount {
  tasks: TaskDocument[];
  totalCount: number;
}

export const getById = async (id: string): Promise<TaskDocument | null> => {
  try {
    const task = await Task.findOne({ _id: id, deletedAt: null });
    return task;
  } catch (error) {
    throw new ErrorHandler(500, "Internal server error");
  }
};

export const getAll = async (id: string): Promise<TaskDocument[]> => {
  try {
    const task = await Task.find({
      taskOwner: id,
      deletedAt: null,
      isCompleted: true,
    });
    return task;
  } catch (error) {
    throw new ErrorHandler(500, "Internal server error");
  }
};

export const getTasksWithPaginationAndSearch = async (
  searchTerm: string,
  id: string,
  pageNo: number,
  pageSize: number
): Promise<TaskDocumentsAndCount> => {
  try {
    let filter: FilterQuery<TaskDocument> = { taskOwner: id, deletedAt: null };
    if (searchTerm && searchTerm.trim() !== "") {
      filter = {
        ...filter,
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }

    const skip: number = (pageNo - 1) * pageSize;

    const tasks = await Task.find(filter)
      .select("-createdAt -deletedAt -updatedAt")
      .sort({ title: 1 })
      .skip(skip)
      .limit(pageSize);
    const totalCount: number = await Task.countDocuments(filter);
    return { tasks, totalCount };
  } catch (error) {
    throw new ErrorHandler(400, "Fetch task failed");
  }
};

export const create = async (
  title: string,
  description: string,
  id: string
): Promise<TaskDocument> => {
  try {
    const task = await Task.create({ title, description, taskOwner: id });
    return task;
  } catch (error) {
    throw new ErrorHandler(400, "Cannot create task");
  }
};

export const update = async (
  id: string,
  title: string,
  description: string,
  isCompleted: false
): Promise<any> => {
  try {
    const task = await Task.updateOne(
      { _id: id },
      {
        title,
        description,
        isCompleted,
        $currentDate: { updatedAt: true },
      },
      { runValidators: true }
    );
    return task;
  } catch (error) {
    throw new ErrorHandler(400, "Cannot update the task");
  }
};

export const deleteOne = async (id: string): Promise<TaskDocument> => {
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { deletedAt: Date.now() },
      { new: true }
    );
    return task;
  } catch (error) {
    throw new ErrorHandler(400, "Cannot delete the task");
  }
};

export const findAllAdmin = async (): Promise<TaskDocument[]> => {
  try {
    const tasks = await Task.find({ deletedAt: null });
    return tasks;
  } catch (error) {
    throw new ErrorHandler(500, "Internal server error");
  }
};
