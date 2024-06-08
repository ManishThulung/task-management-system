import mongoose, { Document, Types } from "mongoose";

export interface TaskDocument extends Document {
  title: string;
  description: string;
  isCompleted: boolean;
  deletedAt: Date | null;
  taskOwner: Types.ObjectId;
}

const taskSchema = new mongoose.Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    taskOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);

export default Task;
