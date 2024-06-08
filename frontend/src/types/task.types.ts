export interface Task {
  _id: string;
  title: string;
  description: string;
  taskOwner: string;
  isCompleted: boolean;
}

export interface TaskApiResponse {
  data: Task[];
  totalTasks: number;
}

export interface TaskResponse {
  data: {
    _id: string;
    title: string;
    description: string;
    taskOwner: string;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
}

export interface TaskFormData {
  title: string;
  description: string;
  isCompleted: boolean;
}
