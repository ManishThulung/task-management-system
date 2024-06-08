import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Loader from "../../components/loader/Loader";
import { TaskCard } from "../../components/task/TaskCard";
import { api } from "../../config/axios";
import useAuth from "../../hooks/useAuth";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { Task, TaskApiResponse } from "../../types/task.types";
import { useState } from "react";
import FormModal from "../../components/modals/FormModal";

const TaskPage = () => {
  const PER_PAGE: number = 3;
  const { user } = useAuth();
  const { query, handleSubmit } = useSearchQuery();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getTasks = async (query: string): Promise<TaskApiResponse> => {
    try {
      console.log(
        `/task?page=${currentPage}&perPage=${PER_PAGE}&search=${query}`
      );
      const res = await api.get(
        `/task?page=${currentPage}&perPage=${PER_PAGE}&search=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      return res?.data;
    } catch (error) {
      throw new Error((error as AxiosError).message);
    }
  };

  const { data, isLoading } = useQuery<TaskApiResponse>({
    queryKey: ["Tasks", query],
    queryFn: () => getTasks(query),
  });

  const showModal = () => {
    setIsOpen(true);
  };

  if (isLoading) {
    <Loader />;
  }

  const roundedResult =
    data?.totalTasks && (Math.ceil(data?.totalTasks / PER_PAGE) as number);
  const pages =
    roundedResult && Array.from({ length: roundedResult }, (_, i) => i + 1);

  console.log(currentPage, "CP");

  return (
    <div className="flex flex-col justify-between">
      <div className="max-w-[1920px] mt-20">
        <div className="flex max-md:flex-wrap gap-5 md:gap-40 justify-center items-center mt-4 max-md:mx-4 ">
          <form onSubmit={handleSubmit} className="max-md:w-full">
            <input
              type="text"
              name="form"
              disabled={isLoading}
              placeholder="Search task"
              className="p-3 outline-none border-1 border-blue-400 rounded-md w-full md:w-[250px] m-auto"
            />
            <button
              disabled={isLoading}
              type="submit"
              className="md:ml-4 px-10 py-3 outline-none border-1 bg-blue-600 rounded-md text-white font-medium max-md:w-full max-md:mt-4"
            >
              Search
            </button>
          </form>
          <button
            type="button"
            className="px-10 py-3 outline-none border-1 bg-blue-600 rounded-md text-white font-medium max-md:w-full"
            onClick={showModal}
          >
            Create Task
          </button>
        </div>

        <div className=" m-auto py-7 md:py-14 px-5 md:px-10">
          <p className="text-2xl font-medium text-center">
            This is our task management system, where you can create and keep
            trak of the tasks.
          </p>
        </div>

        <div className=" flex justify-center gap-5 flex-wrap py-7 md:py-14 px-5 md:px-10">
          {data &&
            data?.data?.map((task: Task) => (
              <div key={task?._id} className="w-full md:w-[250px]">
                <TaskCard data={task} />
              </div>
            ))}
        </div>
      </div>

      {roundedResult && roundedResult > 1 && (
        <div className=" flex gap-5  py-4 md:py-14 px-5 md:px-10">
          <button
            className={
              currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
            }
            onClick={() => {
              setCurrentPage((prevCount) => prevCount - 1);
              queryClient.invalidateQueries({ queryKey: ["Tasks"] });
            }}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pages &&
            pages?.map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  queryClient.invalidateQueries({ queryKey: ["Tasks"] });
                }}
                className={`${
                  currentPage === page ? "bg-slate-400" : ""
                } px-3 py-1 rounded-lg`}
              >
                {page}
              </button>
            ))}
          <button
            onClick={() => {
              setCurrentPage((prevCount) => prevCount + 1);
              queryClient.invalidateQueries({ queryKey: ["Tasks"] });
            }}
            disabled={currentPage === roundedResult}
            className={
              currentPage === roundedResult
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }
          >
            Next
          </button>
        </div>
      )}
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

export default TaskPage;
