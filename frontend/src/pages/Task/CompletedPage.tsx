import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import Loader from "../../components/loader/Loader";
import FormModal from "../../components/modals/FormModal";
import CompletedCard from "../../components/task/Card";
import { api } from "../../config/axios";
import useAuth from "../../hooks/useAuth";
import { Task, TaskApiResponse } from "../../types/task.types";

const CompletedPage = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getCompletedTask = async (): Promise<TaskApiResponse> => {
    try {
      const res = await api.get(`/task/completed`, {
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

  const { data, isLoading } = useQuery<TaskApiResponse>({
    queryKey: ["completed"],
    queryFn: getCompletedTask,
  });

  if (isLoading) {
    <Loader />;
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-[1920px] mt-20">
        <div className="mt-14 mb-8 m-auto">
          <p className="text-2xl font-medium text-center">
            {data?.data && data?.data?.length <= 0
              ? "You dont have any completed tasks yet."
              : "Congratulations, You have already completed all of these tasks."}
          </p>
        </div>

        <div className=" flex justify-center gap-5 flex-wrap py-7 md:py-14 px-5 md:px-10">
          {data &&
            data?.data?.map((task: Task) => (
              <div key={task?._id} className="w-full md:w-[250px]">
                <CompletedCard data={task} />
              </div>
            ))}
        </div>
      </div>
      {isOpen && (
        <FormModal
          isModalOpen={isOpen}
          setIsModalOpen={setIsOpen}
          data={null}
        />
      )}
    </div>
  );
};

export default CompletedPage;
