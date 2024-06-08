import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { api } from "../../config/axios";
import useAuth from "../../hooks/useAuth";
import { TaskResponse } from "../../types/task.types";
import moment from "moment";

const TaskDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const getTaskById = async (): Promise<TaskResponse> => {
    try {
      const res = await api.get(`/task/${id}`, {
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

  const { data, isLoading } = useQuery<TaskResponse>({
    queryKey: ["TaskById", id],
    queryFn: getTaskById,
  });

  if (isLoading) {
    <Loader />;
  }

  return (
    <div className="mt-28 max-w-[1920px]">
      <div className="py-8 px-5 md:py-10 md:px-14">
        <h3 className="text-3xl font-bold text-center">{data?.data?.title}</h3>
        <div className="flex justify-between">
          <p>
            Date:{" "}
            {data?.data?.createdAt &&
              moment(data?.data?.createdAt).format("MM/DD/YYYY")}
          </p>
          <span>
            Status: {data?.data?.isCompleted ? "Completed" : "Not Completed"}
          </span>
        </div>
        <p className="text-xl pt-4">{data?.data?.description}</p>
      </div>
    </div>
  );
};

export default TaskDetailPage;
