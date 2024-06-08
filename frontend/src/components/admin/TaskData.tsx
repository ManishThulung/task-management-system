import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../../config/axios";
import useAuth from "../../hooks/useAuth";
import Loader from "../loader/Loader";

export interface DataType {
  createdAt: string;
  description: string;
  title: string;
}

interface AdminResponseAPI {
  data: DataType[];
}

const TaskData = () => {
  const { user } = useAuth();
  const getAdminTasks = async (): Promise<AdminResponseAPI> => {
    try {
      const res = await api.get(`/task/admin/tasks`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      return res?.data;
    } catch (error) {
      throw new Error((error as AxiosError).message);
    }
  };

  const { data, isLoading } = useQuery<AdminResponseAPI>({
    queryKey: ["AdminTasks"],
    queryFn: getAdminTasks,
  });

  if (isLoading) {
    <Loader />;
  }

  return data?.data && data?.data;
};

export default TaskData;
